import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import routes from "./routes";

const createApp = () => {
  const app = new Koa();
  const router = createRouter();

  app.use(bodyParser());
  app.use(router.routes());

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
