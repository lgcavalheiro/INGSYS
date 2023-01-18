import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { MongoRepository } from "typeorm";
import dataSource from "../app/dataSource";
import IngredientType from "../models/ingredientType";
import NewIngredientTypeInput from "./inputTypes/ingredientTypeResolver.inputs";

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

  @Mutation(() => IngredientType)
  async addIngredientType(
    @Arg("data") data: NewIngredientTypeInput
  ): Promise<IngredientType> {
    const newIngredientType = new IngredientType(data.name, data.description);
    return await this.ingredientTypeRepo.save(newIngredientType);
  }
}

export default IngredientTypeResolver;
