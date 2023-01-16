import { Arg, Query, Resolver } from "type-graphql";
import { ILike, Repository } from "typeorm";
import dataSource from "../app/dataSource";
import Ingredient from "../models/ingredient";

@Resolver()
class IngredientResolver {
  private ingredientRepo: Repository<Ingredient>;

  constructor() {
    this.ingredientRepo = dataSource.getRepository(Ingredient);
  }

  @Query(() => [Ingredient])
  async getIngredients(): Promise<Ingredient[]> {
    return await this.ingredientRepo.find();
  }

  @Query(() => [Ingredient])
  async getIngredientsByName(@Arg("name") name: string): Promise<Ingredient[]> {
    return await this.ingredientRepo.findBy({
      name: ILike(`'%${name}%'`),
    });
  }
}

export default IngredientResolver;
