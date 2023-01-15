import "reflect-metadata";
import Router from "koa-router";
import { App } from "./app/app";
import dataSource from "./app/dataSource";
import getEnvs from "./app/envs";

const app = new App(new Router(), dataSource);

app.listen(
  3000,
  /* tslint:disable-next-line: no-console */
  () => getEnvs().environment !== "prod" && console.log("App started")
);
