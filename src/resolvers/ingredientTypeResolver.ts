import { Query, Resolver } from "type-graphql";
import { Repository } from "typeorm";
import dataSource from "../app/dataSource";
import IngredientType from "../models/ingredientType";

@Resolver()
class IngredientTypeResolver {
  private ingredientTypeRepo: Repository<IngredientType>;

  constructor() {
    this.ingredientTypeRepo = dataSource.getRepository(IngredientType);
  }

  @Query(() => [IngredientType])
  async getIngredientTypes(): Promise<IngredientType[]> {
    return await this.ingredientTypeRepo.find();
  }
}

export default IngredientTypeResolver;
