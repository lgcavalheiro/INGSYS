export default function getEnvs() {
  return {
    environment: process.env.ENV || "dev",
    dataSource: {
      type: process.env.DATA_SOURCE_TYPE || "mongodb",
      host: process.env.DATA_SOURCE_HOST || "localhost",
      port: process.env.DATA_SOURCE_PORT || 27017,
      user: process.env.DATA_SOURCE_USER || "root",
      pass: process.env.DATA_SOURCE_PASS || "example",
      db: process.env.DATA_SOURCE_DB || "ingsys",
    },
  };
}
