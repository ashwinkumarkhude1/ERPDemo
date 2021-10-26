
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import { Team } from "./team";
@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!:string;
  @Column()
  client!:string;
  @Column()
  team!:number;
}