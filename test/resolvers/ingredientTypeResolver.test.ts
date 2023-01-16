import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import resolvers from "../../src/resolvers/index";
import dataSource from "../../src/app/dataSource";

describe("IngredientTypeResolver test suite", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    await dataSource.initialize();
    schema = await buildSchema({ resolvers });
  });

  test("Should return all ingredient types", async () => {
    const { data, errors } = await graphql(
      schema,
      "{ getIngredientTypes { id name } }"
    );
    expect(errors).toBeUndefined();
    expect(data!["getIngredientTypes"]).toBeDefined();
  });

  afterAll(async () => await dataSource.destroy());
});
