import { Field, InputType } from "type-graphql";
import IngredientType from "../../models/ingredientType";

@InputType()
export default class NewIngredientTypeInput implements Partial<IngredientType> {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;
}
