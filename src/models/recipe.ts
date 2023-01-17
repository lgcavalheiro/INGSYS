import BaseModel from "./baseModel";
import RecipeIngredient from "./recipeIngredient";
import { Entity, Column } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export default class Recipe extends BaseModel {
  @Field(() => String)
  @Column({ length: 64, nullable: false })
  name: string;

  @Field(() => [RecipeIngredient])
  @Column(() => RecipeIngredient)
  ingredients: RecipeIngredient[];
}
