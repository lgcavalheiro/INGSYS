import { Field } from "type-graphql";
import { ObjectType } from "type-graphql";
import { Entity, Column } from "typeorm";
import BaseModel from "./baseModel";
import IngredientType from "./ingredientType";

@ObjectType()
@Entity()
export default class Ingredient extends BaseModel {
  @Field(() => String)
  @Column({ length: 64, nullable: false })
  name: string;

  @Field(() => IngredientType)
  @Column(() => IngredientType)
  type: IngredientType;
}
