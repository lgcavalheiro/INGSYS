export default function getEnvs() {
  return {
    environment: process.env.ENV || "dev",
    dataSource: {
      type: process.env.DATA_SOURCE_TYPE || "postgres",
      host: process.env.DATA_SOURCE_HOST || "localhost",
      port: process.env.DATA_SOURCE_PORT || 5432,
      user: process.env.DATA_SOURCE_USER || "postgres",
      pass: process.env.DATA_SOURCE_PASS || "example",
      db: process.env.DATA_SOURCE_DB || "",
    },
  };
}
