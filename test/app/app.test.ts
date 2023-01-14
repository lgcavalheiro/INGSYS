import { describe, expect, test } from "@jest/globals";
import Application from "koa";
import Router from "koa-router";
import { createApp, createRouter } from "../../src/app/app";

describe("App test suite", () => {
  test("Should create and return an instance of Koa", () => {
    const app = createApp();
    expect(app).toBeInstanceOf(Application);
  });

  test("Should create and return an instance of Router", () => {
    const router = createRouter();
    expect(router).toBeInstanceOf(Router);
    expect(router.url("healthcheck", null)).toBe("/healthcheck");
  });
});
