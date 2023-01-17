import { Context } from "koa";

export default function healthcheck(ctx: Context) {
  ctx.body = "OK";
}
