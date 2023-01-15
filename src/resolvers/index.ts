import { NonEmptyArray } from "type-graphql";
import RecipeResolver from "./recipeResolver";

const resolvers: NonEmptyArray<any> = [RecipeResolver];

export default resolvers;
