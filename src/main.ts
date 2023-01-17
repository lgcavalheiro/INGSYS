import "reflect-metadata";
import Router from "koa-router";
import { App } from "./app/app";
import dataSource from "./app/dataSource";
import getEnvs from "./app/envs";
import routes from "./app/routes";

const router = new Router();
routes.forEach(({ path, methods, middleware, opts }) =>
  router.register(path, methods, middleware, opts)
);

const app = new App(router, dataSource);

app.listen(
  3000,
  /* tslint:disable-next-line: no-console */
  () => getEnvs().environment !== "prod" && console.log("App started")
);
