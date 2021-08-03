import { Field, ObjectType } from "type-graphql";
import { Column, PrimaryGeneratedColumn, BaseEntity, Entity } from "typeorm"

@ObjectType()
@Entity()
export class Category extends BaseEntity{
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  Name!: string;
}
