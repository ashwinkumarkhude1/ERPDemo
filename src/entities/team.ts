
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!:string;
  @Column()
  duHead!:number;
  @Column()
  manager!:number;
  @Column()
  teamLead!:number;
  @Column("int",{array:true})
  teamMember!:number[];
}