import Koa from "koa";
import Router from "koa-router";
import routes from "./routes";

const createApp = () => {
  const app = new Koa();
  const router = createRouter();

  app.use(router.routes());

  return app;
};

const createRouter = () => {
  const router = new Router();

  routes.forEach(({ opts, methods, middleware, path }) =>
    router.register(path, methods, middleware, opts)
  );

  return router;
};

export { createApp, createRouter };
