
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
import { Position ,employeeInterface } from "./employeeInterface";
@Entity()
export class Employee extends BaseEntity implements employeeInterface{
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  firstName!: string;
  @Column()
  lastName!: string;
  @Column()
  age!: number;
  @Column()
  experience!: number;
  @Column()
  address!: string;
  @Column()
  mobileNo!: string;
  @Column()
  position!: Position;
  @Column({nullable:true})
  teamLead?:number;
  @Column({nullable:true})
  manager?:number;
  @Column({nullable:true})
  duHead?:number;
  @Column({nullable:true})
  managingDirector?:number;
  @Column({nullable:true})
  CEO?:number;
  @Column({nullable:true})
  team!: string;
}