import { MongoClient } from "mongodb";

const { MDB_USER, MDB_PASS, MDB_HOST, MDB_PORT, MDB_DB } = process.env;
const dbConfig = {
  url: `mongodb://${MDB_USER}:${MDB_PASS}@${MDB_HOST}:${MDB_PORT}/`,
  database: MDB_DB,
};

const client = new MongoClient(dbConfig.url);

async function connect() {
  await client.connect();
  return client.db(dbConfig.database);
}

function close() {
  client.close();
}

export { connect, close };
