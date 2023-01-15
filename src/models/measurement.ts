import { Field, ObjectType } from "type-graphql";
import BaseModel from "./baseModel";
import { Entity, Column, OneToMany } from "typeorm";
import RecipeIngredient from "./recipeIngredient";

@ObjectType()
@Entity()
export default class Measurement extends BaseModel {
  @Field(() => String)
  @Column({ length: 16, nullable: false })
  type: string;

  @Field(() => Number)
  @Column({ type: "float", nullable: false })
  quantity: number;

  @Field(() => RecipeIngredient)
  @OneToMany(() => RecipeIngredient, (recipeIngredient) => recipeIngredient.id)
  recipeIngredientId: RecipeIngredient;
}
