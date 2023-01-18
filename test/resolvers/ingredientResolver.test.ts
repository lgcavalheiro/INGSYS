import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { setup, teardown } from "../utils";

describe("IngredientResolver test suite", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await setup();
  });

  test("Should return all ingredients", async () => {
    const { data, errors } = await graphql(
      schema,
      "{ getIngredients { name } }"
    );
    expect(errors).toBeUndefined();
    expect(data!["getIngredients"]).toBeDefined();
  });

  test("Should be able to search ingredients by name", async () => {
    const { data, errors } = await graphql(
      schema,
      '{ getIngredientsByName(name: "dry") { name } }'
    );
    expect(errors).toBeUndefined();
    expect(data!["getIngredientsByName"]).toBeDefined();
  });

  test("Should return empty array if no ingredient is found", async () => {
    const { data, errors } = await graphql(
      schema,
      '{ getIngredientsByName(name: "ingredient-that-does-not-exist") { name } }'
    );
    expect(errors).toBeUndefined();
    expect(data!["getIngredientsByName"]).toHaveLength(0);
  });

  afterAll(async () => await teardown());
});
