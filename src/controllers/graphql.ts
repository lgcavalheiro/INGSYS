import { GraphQLSchema } from "graphql";
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
} from "graphql-helix";
import { Context } from "koa";
import { buildSchema, NonEmptyArray } from "type-graphql";

declare module "koa" {
  interface Request {
    body?: any;
    rawBody: string;
  }
}

class GraphQLController {
  private schema: GraphQLSchema;

  constructor(resolvers: NonEmptyArray<() => any>) {
    buildSchema({ resolvers }).then((schema) => (this.schema = schema));
  }

  getGraphQLEndpoint() {
    const endpoint = async (ctx: Context) => {
      const request = {
        body: ctx.request.body,
        headers: ctx.req.headers,
        method: ctx.request.method,
        query: ctx.request.query,
      };

      if (request.method === "GET") {
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
        ctx.body = sendResult(result, ctx.res);
      }
    };

    return endpoint;
  }
}

export default GraphQLController;
