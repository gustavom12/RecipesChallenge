import { Query, Resolver, Arg, Mutation, Authorized } from 'type-graphql';
import { Like } from 'typeorm';
import { Category } from '../entities/category';

@Resolver()
export class CategoryResolver {
  @Authorized()
  @Query(() => [Category])
  async getCategories(@Arg('NameFilter', { nullable: true } ) NameFilter?: string) {
    try {
      if(NameFilter){
        return await Category.find({where:{Name: Like(`%${NameFilter}%`)}})
      }
      return await Category.find()
    } catch (error) {
      return error
    }
  }

  @Authorized()
  @Query(() => Category)
  async getOneCategory(@Arg('id') id: number) {
    try {
      const category = await Category.findOne(id)
      if(!category)throw new Error("Error 404 not found");
      return category
    } catch (error) {
      return error
    }
  }

  @Authorized()
  @Mutation(() => String)
  async createCategory(@Arg('Name') Name: string) {
    try {
      if (!Name) throw new Error('You must provide a Name');
      const alreadyExists = await Category.findOne({ where: { Name } });
      if (alreadyExists) throw new Error('Category already exists');
      await Category.insert({ Name });
      return "Category created successfully"
    } catch (error) {
      return error;
    }
  }

  @Authorized()
  @Mutation(() => String)
  async updateCategory(@Arg('id') id: number,@Arg('Name') Name: string) {
    try {
      if (!Name) throw new Error('You must provide a Name');
      if(! await Category.findOne(id)) throw new Error("Category doesn't exists");
      await Category.update(id, {Name})
      return "updated successfully"
    } catch (error) {
      return error
    }
  }

  @Authorized()
  @Mutation(() => String)
  async deleteCategory(@Arg('id') id: number) {
    try {
      if(! await Category.findOne(id)) throw new Error("Category doesn't exists");
      await Category.delete(id)
      return "deleted successfully"
    } catch (error) {
      return error
    }
  }
}
