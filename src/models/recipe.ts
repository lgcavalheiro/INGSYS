import BaseModel from "./baseModel";
import RecipeIngredient from "./recipeIngredient";
import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export default class Recipe extends BaseModel {
  @Field(() => String)
  @Column({ length: 64, nullable: false, unique: true })
  name: string;

  @Field(() => [RecipeIngredient])
  @ManyToMany(() => RecipeIngredient, (ingredient) => ingredient.recipes, {
    cascade: true,
  })
  @JoinTable()
  ingredients: RecipeIngredient[];
}
