import { type } from "os";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn} from "typeorm";
enum position{
  CEO="CEO",
  MD="MD",
  DUHead="DUHead",
  Manager="Manager",
  TL="TL",
  SDE="SDE",
  SDET="SDET",
  DevOps="DevOps"
}
@Entity()
export class Employee extends BaseEntity{
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
  position!: position;
  @OneToOne(() => Employee)
  @JoinColumn()
  reportingTo!:Employee;

}