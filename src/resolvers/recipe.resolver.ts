import {
  Query,
  Resolver,
  Arg,
  Mutation,
  FieldResolver,
  Root,
  Authorized,
} from 'type-graphql';
import { Category } from '../entities/category';
import { Recipe } from '../entities/recipe';
import { User } from '../entities/user';
import { FiltersRecipesInput, RecipeInput } from '../types/recipe.types';

@Resolver((of) => Recipe)
export class RecipeResolver {
  @Query(() => [Recipe])
  @Authorized()
  async getRecipes(
    @Arg('RecipeFilters', { nullable: true }) RecipeFilters: FiltersRecipesInput
  ) {
    try {
      if (RecipeFilters) {
        const query = Recipe.createQueryBuilder('recipe');
        return await filterRecipes(query, RecipeFilters);
      }
      return await Recipe.find();
    } catch (error) {
      return error;
    }
  }

  @Authorized()
  @Query(() => Recipe)
  async getOneRecipe(@Arg('id') id: number) {
    try {
      return await Recipe.findOneOrFail(id);
    } catch (error) {
      return error;
    }
  }

  @Authorized()
  @Query(() => [Recipe])
  async getMyRecipes(
    @Arg('userId') userId: number,
    @Arg('RecipeFilters', { nullable: true }) RecipeFilters: FiltersRecipesInput
  ) {
    try {
      const user = await User.findOneOrFail(userId);
      if (RecipeFilters) {
        //With this for, i am filtering only recipes with the ids of user's recipes
        const query = Recipe.createQueryBuilder('recipe');
        const userRecipesIds = [];
        for (let i in user.Recipes)
          userRecipesIds.push({ id: user.Recipes[i] });
        query.andWhere(userRecipesIds);
        return await filterRecipes(query, RecipeFilters);
      }
      const recipes = [];
      for (let i in user.Recipes)
        recipes.push(await Recipe.findOne(user.Recipes[i]));
      return recipes;
    } catch (error) {
      return error;
    }
  }

  @Authorized()
  @Mutation(() => String)
  async createRecipe(
    @Arg('RecipeArg', () => RecipeInput) RecipeArg: RecipeInput,
    @Arg('userId') userId: number
  ) {
    try {
      if (!RecipeArg.Name) throw new Error('Recipe must have a Name');
      if (RecipeArg.Ingredients.length === 0)
        throw new Error('Recipe must have at least 1 ingredient');
      if(!await Category.findOne(RecipeArg.Category)) throw new Error("there is not category with this id");
      //insert and returns ID of recipe
      const recipeId: any = await (
        await Recipe.insert(RecipeArg)
      ).generatedMaps[0].id;
      const userPreviousRecipes = (await User.findOneOrFail(userId)).Recipes;
      //insert ID of recipe inside user's recipes
      await User.update(userId, {
        Recipes: [...userPreviousRecipes, recipeId],
      });
      return 'Recipe created successfully ';
    } catch (error) {
      return error;
    }
  }

  @Authorized()
  @Mutation(() => String)
  async updateRecipe(@Arg('recipeInput') recipeInput: RecipeInput) {
    try {
      await Recipe.update(recipeInput.id, recipeInput);
      return 'recipe updated successfully';
    } catch (error) {
      return error;
    }
  }

  @Authorized()
  @Mutation(() => String)
  async deleteRecipe(@Arg('id') id: number, @Arg('userId') UserId: number) {
    try {
      await (await Recipe.findOneOrFail(id)).remove();
      //Removes recipe from array of recipes of user
      const user = await User.findOneOrFail(UserId);
      user.Recipes.splice(user.Recipes.indexOf(`${id}`), 1);
      await user.save();
      return 'deleted successfully';
    } catch (error) {
      return error;
    }
  }

  @Authorized()
  @FieldResolver(() => Category)
  //Resolve this field every time that is queried
  async Category(@Root() recipe: Recipe) {
    const category = await Category.findOne(recipe.Category);
    if (!category)
      return {
        Name: 'Category deleted',
        id: recipe.Category,
      };
    return category;
  }
}

//Default filter of recipes
async function filterRecipes(query: any, RecipeFilters: FiltersRecipesInput) {
  if (RecipeFilters.Description)
    query.andWhere(`recipe.Description %${RecipeFilters.Description}%`);
  if (RecipeFilters.Name)
    query.andWhere(`recipe.Name like :Name`, {
      Name: `%${RecipeFilters.Name}%`,
    });
  if (RecipeFilters.Category)
    query.andWhere(`recipe.Category = :category`, {
      category: RecipeFilters.Category,
    });
  if (RecipeFilters.Ingredients) {
    //Search for a Recipe where ingredients are like or similar to "Inputs Ingredients"
    query.andWhere('recipe.Ingredients like :ingredient', {
      ingredient: `%${RecipeFilters.Ingredients.join(',')}%`,
    });
  }
  return await query.getMany();
}
