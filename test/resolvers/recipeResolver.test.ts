import { describe, expect, test, beforeAll, afterAll } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import resolvers from "../../src/resolvers/index";
import dataSource from "../../src/app/dataSource";

describe("RecipeResolver test suite", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    await dataSource.initialize();
    schema = await buildSchema({ resolvers });
  });

  test("Should return all recipes", async () => {
    const { data, errors } = await graphql(schema, "{ getRecipes { name } }");
    expect(errors).toBeUndefined();
    expect(data!["getRecipes"]).toBeDefined();
  });

  test("Should return all recipes searching by name", async () => {
    const { data, errors } = await graphql(
      schema,
      '{ getRecipes(name: "nes") { name } }'
    );
    expect(errors).toBeUndefined();
    expect(data!["getRecipes"]).toBeDefined();
  });

  test("Should return no recipes if name search has no matches", async () => {
    const { data, errors } = await graphql(
      schema,
      '{ getRecipes(name: "some-name-search-that-has-no-matches") { name } }'
    );
    expect(errors).toBeUndefined();
    expect(data!["getRecipes"]).toHaveLength(0);
  });

  afterAll(async () => await dataSource.destroy());
});
