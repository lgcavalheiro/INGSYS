import BaseModel from "./baseModel";
import Ingredient from "./ingredient";
import IngredientType from "./ingredientType";
import Measurement from "./measurement";
import Recipe from "./recipe";
import RecipeIngredient from "./recipeIngredient";

const modelList = [
  IngredientType,
  Ingredient,
  RecipeIngredient,
  Measurement,
  Recipe,
  BaseModel,
];

export default modelList;
