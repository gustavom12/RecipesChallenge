import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, In } from "typeorm"
import { Field, Int, ObjectType } from "type-graphql";
import { Category } from "./category";

@ObjectType()
@Entity()
export class Recipe extends BaseEntity{
  @Field(()=> Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(()=> String)
  @Column("varchar", {nullable:false})
  Name!: string;

  @Field(()=> String)
  @Column()
  Description!: string;

  @Field(()=> [String])
  @Column("simple-array",{nullable:false})
  Ingredients!: string[];

  @Field(()=>Category)
  @Column("int", {nullable:false})
  Category!: number;
}
