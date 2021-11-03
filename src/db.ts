import "reflect-metadata";
import {createConnection} from "typeorm";
import { Employee } from "./entities/employee";
import { Project } from "./entities/project";
import { Team } from "./entities/team";
export async function intializeDB(host:string,username:string,password:string,database:string, ): Promise<void> {
  await createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "ERP_DB",
    entities: [Employee,Team,Project],
    synchronize: true
  });
}