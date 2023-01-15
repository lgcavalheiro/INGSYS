import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import routes from "./routes";
import dataSource from "./dataSource";

const createApp = (initDataSource = false) => {
  const app = new Koa();
  const router = createRouter();

  app.use(bodyParser());
  app.use(router.routes());

  /* tslint:disable: no-console */
  if (initDataSource)
    dataSource
      .initialize()
      .then(() => console.log("DB initialized"))
      .catch((error) => console.error(error));
  /* tslint:enable: no-console */

  return app;
};

const createRouter = () => {
  const router = new Router();

  routes.forEach(({ path, methods, middleware, opts }) =>
    router.register(path, methods, middleware, opts)
  );

  return router;
};

export { createApp, createRouter };
