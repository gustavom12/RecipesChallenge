import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class FiltersRecipesInput {
  @Field({ nullable: true })
  Category!: number;

  @Field({ nullable: true })
  Name!: string;

  @Field(() => [String], { nullable: true })
  Ingredients!: string[];

  @Field({ nullable: true })
  Description!: string;
}

@InputType()
export class RecipeInput {
  @Field(() => Int, { nullable: true })
  id!: number;

  @Field(() => String)
  Name!: string;

  @Field(() => String)
  Description!: string;

  @Field(() => [String])
  Ingredients!: string[];

  @Field(() => Int)
  Category!: number;
}
