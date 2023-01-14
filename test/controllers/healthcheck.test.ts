import { Context } from "koa";
import { describe, expect, test } from "@jest/globals";
import healthcheck from "../../src/controllers/healthcheck";

describe("Healthcheck controller test suite", () => {
  test("Should add 'OK', message to context body", () => {
    const ctx = { body: null };
    healthcheck(ctx as Context);
    expect(ctx.body).toBe("OK");
  });
});
