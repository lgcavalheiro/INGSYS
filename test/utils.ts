import { MongoMemoryServer } from "mongodb-memory-server";
import { buildSchema } from "type-graphql";
import dataSource from "../src/app/dataSource";
import resolvers from "../src/resolvers";

let mms: MongoMemoryServer;

const setup = async () => {
  mms = await MongoMemoryServer.create();
  dataSource.setOptions({ url: mms.getUri() });
  await dataSource.initialize();
  return await buildSchema({
    resolvers,
    validate: { forbidUnknownValues: false },
  });
};

const teardown = async () => {
  await dataSource.destroy();
  await mms.stop();
};

export { setup, teardown };
