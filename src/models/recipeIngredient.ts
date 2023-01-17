import { Field, ObjectType } from "type-graphql";
import { Column } from "typeorm";
import Ingredient from "./ingredient";
import Measurement from "./measurement";

@ObjectType()
export default class RecipeIngredient {
  @Field(() => Measurement)
  @Column(() => Measurement)
  measurement: Measurement;

  @Field(() => Ingredient)
  @Column(() => Ingredient)
  ingredient: Ingredient;
}
