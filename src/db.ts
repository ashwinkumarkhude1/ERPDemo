import "reflect-metadata";
import {createConnection} from "typeorm";
import { Employee } from "./entities/employee";
import { Project } from "./entities/project";
import { Team } from "./entities/team";
export async function intializeDB(hostParameter:string,usernameParameter:string,passwordParameter:string,databaseParameter:string,portParameter:any ): Promise<void> {
  await createConnection({
    type: "postgres",
    host: hostParameter,
    port: portParameter,
    username: usernameParameter,
    password: passwordParameter,
    database: databaseParameter,
    entities: [Employee,Team,Project],
    synchronize: true
  });
}