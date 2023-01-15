import "reflect-metadata";
import Router from "koa-router";
import { App } from "./app/app";
import dataSource from "./app/dataSource";

const app = new App(new Router(), dataSource);

/* tslint:disable-next-line: no-console */
app.listen(3000, () => console.log("App started"));
