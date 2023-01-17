import { Arg, Query, Resolver } from "type-graphql";
import Recipe from "../models/recipe";
import { MongoRepository } from "typeorm";
import dataSource from "../app/dataSource";

@Resolver()
class RecipeResolver {
  private recipeRepo: MongoRepository<Recipe>;

  constructor() {
    this.recipeRepo = dataSource.getMongoRepository(Recipe);
  }

  @Query(() => [Recipe])
  async getRecipes(
    @Arg("name", { nullable: true }) name?: string
  ): Promise<Recipe[]> {
    if (name)
      return await this.recipeRepo.findBy({
        name: new RegExp(name, "gi"),
      });

    return await this.recipeRepo.find();
  }

  @Query(() => [Recipe])
  async getRecipesContainingIngredient(
    @Arg("ingredientName") ingredientName: string
  ): Promise<Recipe[]> {
    return await this.recipeRepo.findBy({
      "ingredients.ingredient.name": new RegExp(ingredientName, "gi"),
    });
  }

  @Query(() => [Recipe])
  async getRecipesContainingIngredientType(
    @Arg("ingredientType") ingredientType: string
  ): Promise<Recipe[]> {
    return await this.recipeRepo.findBy({
      "ingredients.ingredient.type.name": new RegExp(ingredientType, "gi"),
    });
  }
}

export default RecipeResolver;
