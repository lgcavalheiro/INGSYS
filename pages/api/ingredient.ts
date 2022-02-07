import { NextApiRequest, NextApiResponse } from "next";
import IngredientQueries from "./database/ingredientQueries";

export interface IngredientQuery {
  type?: string;
  ingredient?: string;
}

const getMethodLiterals = {
  getAll: async () => {
    const { result, errorMsg } = await IngredientQueries.getIngredients();
    const { status, error } = !errorMsg
      ? { status: 200, error: null }
      : { status: 404, error: errorMsg };
    return { status, result, error };
  },
  byIngredientName: async (ingredient: string) => {
    const { result, errorMsg } = await IngredientQueries.getIngredientByName(
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
  byTypeName: async (type: string) => {
    const { result, errorMsg } = await IngredientQueries.getIngredientByType(
      type
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
  GET: async (query: IngredientQuery) => {
    try {
      if (!query.type && !query.ingredient) return getMethodLiterals.getAll();
      if (query.type) return getMethodLiterals.byTypeName(query.type);
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
