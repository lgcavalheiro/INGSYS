import modelList from "../models";
import { DataSource } from "typeorm";

const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "example",
  database: "",
  entities: modelList,
  synchronize: true,
  logging: false,
});

export default dataSource;
