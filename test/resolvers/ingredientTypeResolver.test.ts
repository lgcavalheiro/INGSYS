import { afterAll, beforeAll, describe, expect, test } from "@jest/globals";
import { graphql, GraphQLSchema } from "graphql";
import { setup, teardown } from "../utils";

describe("IngredientTypeResolver test suite", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await setup();
  });

  test("Should return all ingredient types", async () => {
    const { data, errors } = await graphql(
      schema,
      "{ getIngredientTypes { name } }"
    );
    expect(errors).toBeUndefined();
    expect(data!["getIngredientTypes"]).toBeDefined();
  });

  test("Should create a new ingredient type", async () => {
    const name = "test ingredient";
    const description = "test description";

    const { data, errors } = await graphql(
      schema,
      `
        mutation addIngredientType {
          addIngredientType(data: { name: "${name}", description: "${description}" }) {
            _id
            name
            description
          }
        }
      `
    );

    expect(errors).toBeUndefined();
    expect(data!["addIngredientType"]["_id"]).toBeDefined();
    expect(data!["addIngredientType"]["name"]).toBe(name);
    expect(data!["addIngredientType"]["description"]).toBe(description);
  });

  afterAll(async () => await teardown());
});
