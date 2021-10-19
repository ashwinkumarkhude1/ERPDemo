import "reflect-metadata";
import {createConnection} from "typeorm";
import { Employee } from "./entities/employee";
// import { Tedis } from "tedis";
// import logger from '../src/shared/Logger';
export async function intializeDB(): Promise<void> {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "ERP_DB",
    entities: [Employee],
    synchronize: true
  });
}