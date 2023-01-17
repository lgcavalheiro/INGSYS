import modelList from "../models";
import { DataSource } from "typeorm";
import getEnvs from "./envs";

const { type, host, port, user, pass, db } = getEnvs().dataSource;

const dataSource = new DataSource({
  type: type as any,
  host,
  port: port as number,
  username: user,
  password: pass,
  database: db,
  entities: modelList,
  synchronize: true,
  logging: false,
});

export default dataSource;
