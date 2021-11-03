import "reflect-metadata";
import {createConnection} from "typeorm";
import { Employee } from "./entities/employee";
import { Project } from "./entities/project";
import { Team } from "./entities/team";
export async function intializeDB(hostParameter:string,usernameParameter:string,passwordParameter:string,databaseParameter:string, ): Promise<void> {
  await createConnection({
    type: "postgres",
    host: hostParameter,
    port: 5432,
    username: usernameParameter,
    password: passwordParameter,
    database: databaseParameter,
    entities: [Employee,Team,Project],
    synchronize: true
  });
}