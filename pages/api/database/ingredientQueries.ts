import { Timestamp } from "mongodb";
import { connect, close } from "./connector";

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

const IngredientQueries = {
  async getIngredients() {
    const db = await connect();
    const result = await db
      .collection<IIngredient>("ingredient")
      .find()
      .toArray();
    close();
    const errorMsg = result.length > 0 ? null : "Sorry, no ingredients found";
    return { result, errorMsg };
  },

  async getIngredientByName(ingredient: string) {
    const db = await connect();
    const result = await db
      .collection<IIngredient>("ingredient")
      .find({ name: new RegExp(ingredient, "i") })
      .toArray();
    close();
    const errorMsg =
      result.length > 0
        ? null
        : `Sorry, no ingredients found for the ingredient query: ${ingredient}`;
    return { result, errorMsg };
  },

  async getIngredientByType(type: string) {
    const db = await connect();
    const result = await db
      .collection<IIngredient>("ingredient")
      .find({ type: new RegExp(type, "i") })
      .toArray();
    close();
    const errorMsg =
      result.length > 0
        ? null
        : `Sorry, no ingredients found for the type query: ${type}`;
    return { result, errorMsg };
  },
};

export default IngredientQueries;
