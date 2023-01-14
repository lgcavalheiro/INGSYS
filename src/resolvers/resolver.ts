import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
class TestResolver {
  @Query(() => String)
  async getUppercase(@Arg("msg") msg: string) {
    return msg.toUpperCase();
  }
}

export default TestResolver;
