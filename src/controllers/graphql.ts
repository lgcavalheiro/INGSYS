import { ExecutionResult, GraphQLError, GraphQLSchema } from "graphql";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
} from "graphql-helix";
import { Context } from "koa";
import { buildSchema, NonEmptyArray } from "type-graphql";
import getEnvs from "../app/envs";

declare module "koa" {
  interface Request {
    body?: any;
    rawBody: string;
  }
}

const formatResult = (result: ExecutionResult) => {
  const formattedResult: ExecutionResult = {
    data: result.data,
  };

  if (result.errors) {
    formattedResult.errors = result.errors.map((error) => {
      return new GraphQLError(
        error.message,
        error.nodes,
        error.source,
        error.positions,
        error.path,
        null,
        {
          timestamp: Date.now(),
          stack: error.stack,
          original: error.originalError,
        }
      );
    });
  }

  return formattedResult;
};

class GraphQLController {
  private schema: GraphQLSchema;

  constructor(resolvers: NonEmptyArray<() => any>) {
    buildSchema({ resolvers, validate: { forbidUnknownValues: false } }).then(
      (schema) => (this.schema = schema)
    );
  }

  getGraphQLEndpoint() {
    const endpoint = async (ctx: Context) => {
      const request = {
        body: ctx.request.body,
        headers: ctx.req.headers,
        method: ctx.request.method,
        query: ctx.request.query,
      };

      if (request.method === "GET" && getEnvs().environment !== "prod") {
        ctx.body = renderGraphiQL();
      } else {
        const { operationName, query, variables } =
          getGraphQLParameters(request);

        const result = await processRequest({
          operationName,
          query,
          variables,
          request,
          schema: this.schema,
        });

        ctx.respond = false;
        ctx.body = sendResult(result, ctx.res, formatResult);
      }
    };

    return endpoint;
  }
}

export default GraphQLController;
