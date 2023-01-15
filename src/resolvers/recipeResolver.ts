import { Arg, Query, Resolver } from "type-graphql";
import Recipe from "../models/recipe";
import { Repository, ILike } from "typeorm";
import dataSource from "../app/dataSource";

@Resolver()
class RecipeResolver {
  private recipeRepo: Repository<Recipe>;

  constructor() {
    this.recipeRepo = dataSource.getRepository(Recipe);
  }

  @Query(() => [Recipe])
  async getRecipes(
    @Arg("name", { nullable: true }) name?: string
  ): Promise<Recipe[]> {
    const query = this.recipeRepo
      .createQueryBuilder("recipe")
      .innerJoinAndSelect("recipe.ingredients", "ingredients")
      .innerJoinAndSelect("ingredients.measurement", "measurement")
      .innerJoinAndSelect("ingredients.ingredient", "ingredient")
      .innerJoinAndSelect("ingredient.type", "type")
      .orderBy("recipe.created", "DESC");

    if (name) query.where({ name: ILike(`%${name}%`) });

    return await query.getMany();
  }
}

export default RecipeResolver;
