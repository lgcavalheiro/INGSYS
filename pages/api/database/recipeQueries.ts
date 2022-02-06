import { Timestamp } from "mongodb";
import { close, connect } from "./connector";

export interface IRecipe {
  _id: string;
  name: string;
  ingredients: Array<IRecipeIngredient>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// TODO: eventually move this to some other more appropriate place?
interface IIngredient {
  _id: string;
  name: string;
  type: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

interface IRecipeIngredient
  extends Omit<IIngredient, "_id" | "createdAt" | "updatedAt"> {
  ingredientId: string;
  quantity: number;
}

const RecipeQueries = {
  async getRecipes() {
    const db = await connect();
    const result = await db.collection<IRecipe>("recipe").find().toArray();
    close();
    const errorMsg = result.length > 0 ? null : "Sorry, no recipes found";
    return { result, errorMsg };
  },

  async getRecipeByName(recipe: string) {
    const db = await connect();
    const result = await db
      .collection<IRecipe>("recipe")
      .find({ name: new RegExp(recipe, "i") })
      .toArray();
    close();
    const errorMsg =
      result.length > 0
        ? null
        : `Sorry, no recipes found for the recipe query: ${recipe}`;
    return { result, errorMsg };
  },

  async getRecipeByIngredientName(ingredient: string) {
    const db = await connect();
    const result = await db
      .collection<IRecipe>("recipe")
      .find({ "ingredients.name": new RegExp(ingredient, "i") })
      .toArray();
    close();
    const errorMsg =
      result.length > 0
        ? null
        : `Sorry, no recipes found for the ingredient query: ${ingredient}`;
    return { result, errorMsg };
  },
};

export default RecipeQueries;
