import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from "typeorm"
import { Recipe } from "./recipe";

@ObjectType()
@Entity()
export class User extends BaseEntity{

  @Field(()=> Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(()=> String)
  @Column()
  Name!: string;

  @Field(()=> String)
  @Column()
  Email!: string;

  @Field(()=> String)
  @Column()
  Password!: string;

  @Field(()=> String)
  @Column()
  Token!: string

  @Field(()=> [Recipe])
  @Column("simple-array")
  Recipes!: string[];
}
