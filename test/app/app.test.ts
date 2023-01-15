import { DataSource } from "typeorm";
import { describe, expect, test } from "@jest/globals";
import Application from "koa";
import Router from "koa-router";
import { App } from "../../src/app/app";

describe("App test suite", () => {
  test("Should create an instance of App", () => {
    const fakeDataSource = {
      initialize: async () => {},
    };
    const app = new App(new Router(), fakeDataSource as unknown as DataSource);
    expect(app).toBeInstanceOf(Application);
  });
});
