import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import getEnvs from "./envs";

export class App extends Koa {
  constructor(
    router: Router,
    private dataSource: DataSource,
    koaOpts?: object
  ) {
    super(koaOpts);
    dotenv.config();

    this.use(bodyParser());
    this.use(router.routes());

    /* tslint:disable: no-console */
    this.dataSource
      .initialize()
      .then(
        () => getEnvs().environment !== "prod" && console.log("DB initialized")
      )
      .catch((error) => console.error(error));
    /* tslint:enable: no-console */
  }
}
