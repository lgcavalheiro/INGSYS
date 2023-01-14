import { NonEmptyArray } from "type-graphql";
import TestResolver from "./resolver";

const resolvers: NonEmptyArray<Function> = [TestResolver];

export default resolvers;
