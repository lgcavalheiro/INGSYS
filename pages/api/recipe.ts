import { NextApiRequest, NextApiResponse } from "next";
import RecipeQueries from "./database/recipeQueries";

export interface Query {
  recipe?: string;
  ingredient?: string;
}

const getMethodLiterals = {
  getAll: async () => {
    const { result, errorMsg } = await RecipeQueries.getRecipes();
    const { status, error } = !errorMsg
      ? { status: 200, error: null }
      : { status: 404, error: errorMsg };
    return { status, result, error };
  },
  byRecipeName: async (recipe: string) => {
    const { result, errorMsg } = await RecipeQueries.getRecipeByName(recipe);
    const { status, error } = !errorMsg
      ? { status: 200, error: null }
      : {
          status: 404,
          error: errorMsg,
        };
    return { status, result, error };
  },
  byIngredientName: async (ingredient: string) => {
    const { result, errorMsg } = await RecipeQueries.getRecipeByIngredientName(
      ingredient
    );
    const { status, error } = !errorMsg
      ? { status: 200, error: null }
      : {
          status: 404,
          error: errorMsg,
        };
    return { status, result, error };
  },
};

const methodLiterals = {
  GET: async (query: Query) => {
    try {
      if (!query.recipe && !query.ingredient) return getMethodLiterals.getAll();
      if (query.recipe) return getMethodLiterals.byRecipeName(query.recipe);
      if (query.ingredient)
        return getMethodLiterals.byIngredientName(query.ingredient);
      return {
        status: 400,
        result: null,
        error: "The request was not understood by the server",
      };
    } catch (err) {
      return { status: 500, result: null, error: err };
    }
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { status, result, error } = methodLiterals[req.method]
    ? await methodLiterals[req.method](req.query)
    : {
        status: 405,
        result: null,
        error: `Method ${req.method} not supported`,
      };

  return res.status(status).json({ result, error });
}

export default handler;
