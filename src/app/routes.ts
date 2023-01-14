import { ILayerOptions, IMiddleware } from "koa-router";
import healthcheck from "../controllers/healthcheck";

interface RouteRegistry {
  opts: ILayerOptions;
  path: string | RegExp;
  methods: string[];
  middleware: IMiddleware;
}

const routes: RouteRegistry[] = [
  {
    opts: { name: "healthcheck" },
    path: "/healthcheck",
    methods: ["get"],
    middleware: healthcheck,
  },
];

export default routes;
