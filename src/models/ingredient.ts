import { Field } from "type-graphql";
import { ObjectType } from "type-graphql";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import BaseModel from "./baseModel";
import IngredientType from "./ingredientType";
import RecipeIngredient from "./recipeIngredient";

@ObjectType()
@Entity()
export default class Ingredient extends BaseModel {
  @Field(() => String)
  @Column({ length: 64, nullable: false, unique: true })
  name: string;

  @Field(() => IngredientType)
  @ManyToOne(() => IngredientType, (ingredientType) => ingredientType.id, {
    cascade: true,
  })
  type: IngredientType;

  @Field(() => RecipeIngredient)
  @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.id)
  recipeIngredient: RecipeIngredient;
}
