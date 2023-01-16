import { NonEmptyArray } from "type-graphql";
import IngredientResolver from "./ingredientResolver";
import IngredientTypeResolver from "./ingredientTypeResolver";
import RecipeResolver from "./recipeResolver";

const resolvers: NonEmptyArray<any> = [
  RecipeResolver,
  IngredientTypeResolver,
  IngredientResolver,
];

export default resolvers;
