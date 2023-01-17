import { ILayerOptions, IMiddleware } from "koa-router";
import GraphQLController from "../controllers/graphql";
import healthcheck from "../controllers/healthcheck";
import resolvers from "../resolvers";

interface RouteRegistry {
  opts: ILayerOptions;
  path: string | RegExp;
  methods: string[];
  middleware: IMiddleware;
}

const routes: RouteRegistry[] = [
  {
    path: "/healthcheck",
    methods: ["get"],
    middleware: healthcheck,
    opts: { name: "healthcheck" },
  },
  {
    path: "/graphql",
    methods: ["get", "post"],
    middleware: new GraphQLController(resolvers).getGraphQLEndpoint(),
    opts: { name: "graphql" },
  },
];

export default routes;
