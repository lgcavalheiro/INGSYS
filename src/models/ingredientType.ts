import { Field, ObjectType } from "type-graphql";
import { Entity, Column } from "typeorm";
import BaseModel from "./baseModel";

@ObjectType()
@Entity()
export default class IngredientType extends BaseModel {
  @Field(() => String)
  @Column({ length: 32, nullable: false })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;
}
