import { Query, Resolver } from "type-graphql";
import Recipe from "../models/recipe";
import { Repository } from "typeorm";
import dataSource from "../app/dataSource";

@Resolver()
class RecipeResolver {
  private recipeRepo: Repository<Recipe>;

  constructor() {
    this.recipeRepo = dataSource.getRepository(Recipe);
  }

  @Query(() => [Recipe])
  async getRecipes(): Promise<Recipe[]> {
    const recipes = await this.recipeRepo
      .createQueryBuilder("recipe")
      .innerJoinAndSelect("recipe.ingredients", "ingredients")
      .innerJoinAndSelect("ingredients.measurement", "measurement")
      .innerJoinAndSelect("ingredients.ingredient", "ingredient")
      .innerJoinAndSelect("ingredient.type", "type")
      .orderBy("recipe.created", "DESC")
      .getMany();

    return recipes;
  }
}

export default RecipeResolver;
