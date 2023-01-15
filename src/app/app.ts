import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import routes from "./routes";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import getEnvs from "./envs";

export class App extends Koa {
  private dataSource: DataSource;

  constructor(router: Router, dataSource: DataSource, koaOpts?: object) {
    super(koaOpts);
    dotenv.config();

    routes.forEach(({ path, methods, middleware, opts }) =>
      router.register(path, methods, middleware, opts)
    );
    this.use(bodyParser());
    this.use(router.routes());

    this.dataSource = dataSource;
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
