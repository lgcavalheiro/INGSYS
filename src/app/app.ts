import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import routes from "./routes";
import { DataSource } from "typeorm";

export class App extends Koa {
  private dataSource: DataSource;

  constructor(router: Router, dataSource: DataSource, koaOpts?: object) {
    super(koaOpts);

    routes.forEach(({ path, methods, middleware, opts }) =>
      router.register(path, methods, middleware, opts)
    );
    this.use(bodyParser());
    this.use(router.routes());

    this.dataSource = dataSource;
    /* tslint:disable: no-console */
    this.dataSource
      .initialize()
      .then(() => console.log("DB initialized"))
      .catch((error) => console.error(error));
    /* tslint:enable: no-console */
  }
}
