import { Query, Resolver } from "type-graphql";
import { MongoRepository } from "typeorm";
import dataSource from "../app/dataSource";
import IngredientType from "../models/ingredientType";

@Resolver()
class IngredientTypeResolver {
  private ingredientTypeRepo: MongoRepository<IngredientType>;

  constructor() {
    this.ingredientTypeRepo = dataSource.getMongoRepository(IngredientType);
  }

  @Query(() => [IngredientType])
  async getIngredientTypes(): Promise<IngredientType[]> {
    return await this.ingredientTypeRepo.find();
  }
}

export default IngredientTypeResolver;
