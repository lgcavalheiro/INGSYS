import { Field, ObjectType } from "type-graphql";
import { Entity, Column, OneToMany } from "typeorm";
import BaseModel from "./baseModel";
import Ingredient from "./ingredient";
import RecipeIngredient from "./recipeIngredient";

@ObjectType()
@Entity()
export default class IngredientType extends BaseModel {
  @Field(() => String)
  @Column({ length: 32, nullable: false, unique: true })
  name: string;

  @Field(() => String)
  @Column("text")
  description: string;

  @Field(() => Ingredient)
  @OneToMany(() => Ingredient, (ingredient) => ingredient.id)
  ingredient: Ingredient;

  @Field(() => RecipeIngredient)
  @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.id)
  recipeIngredient: RecipeIngredient;
}
