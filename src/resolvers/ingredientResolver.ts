import { Arg, Query, Resolver } from "type-graphql";
import { MongoRepository } from "typeorm";
import dataSource from "../app/dataSource";
import Ingredient from "../models/ingredient";

@Resolver()
class IngredientResolver {
  private ingredientRepo: MongoRepository<Ingredient>;

  constructor() {
    this.ingredientRepo = dataSource.getMongoRepository(Ingredient);
  }

  @Query(() => [Ingredient])
  async getIngredients(): Promise<Ingredient[]> {
    return await this.ingredientRepo.find();
  }

  @Query(() => [Ingredient])
  async getIngredientsByName(@Arg("name") name: string): Promise<Ingredient[]> {
    return await this.ingredientRepo.findBy({
      name: new RegExp(name, "gi"),
    });
  }
}

export default IngredientResolver;
