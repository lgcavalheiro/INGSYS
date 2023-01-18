import { Field, ObjectType } from "type-graphql";
import { Entity, Column } from "typeorm";
import BaseModel from "./baseModel";

@ObjectType()
@Entity()
export default class IngredientType extends BaseModel {
  constructor(name: string, description?: string) {
    super();
    this.name = name;
    this.description = description;
  }

  @Field(() => String)
  @Column({ length: 32 })
  name: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  description?: string;
}
