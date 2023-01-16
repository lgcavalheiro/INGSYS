import { DataSource } from "typeorm";
import Router from "koa-router";
import { App } from "./../../src/app/app";
import { describe, expect, test, beforeAll } from "@jest/globals";
import request from "supertest";
import routes from "../../src/app/routes";

describe("GraphQL controller test suite", () => {
  let app: App;
  const fakeDataSource = {
    initialize: async () => {},
  };

  beforeAll(() => {
    const router = new Router();
    routes.forEach(({ path, methods, middleware, opts }) =>
      router.register(path, methods, middleware, opts)
    );
    app = new App(router, fakeDataSource as unknown as DataSource);
  });

  test("Should provide the graphql endpoint GET", async () => {
    const response = await request(app.callback()).get("/graphql");
    expect(response.status).toBe(200);
  });

  test("Should provide the graphql endpoint POST", async () => {
    const response = await request(app.callback())
      .post("/graphql")
      .send({ query: "{ getRecipes { name } }" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
  });
});
