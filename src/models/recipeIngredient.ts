import { Field, ObjectType } from "type-graphql";
import BaseModel from "./baseModel";
import { Entity, ManyToOne, ManyToMany } from "typeorm";
import Ingredient from "./ingredient";
import Measurement from "./measurement";
import Recipe from "./recipe";

@ObjectType()
@Entity()
export default class RecipeIngredient extends BaseModel {
  @Field(() => Measurement)
  @ManyToOne(() => Measurement, (measurement) => measurement.id, {
    cascade: true,
  })
  measurement: Measurement;

  @Field(() => Ingredient)
  @ManyToOne(() => Ingredient, (ingredient) => ingredient.id, { cascade: true })
  ingredient: Ingredient;

  @Field(() => [Recipe])
  @ManyToMany(() => Recipe, (recipe) => recipe.ingredients)
  recipes: Recipe[];
}
