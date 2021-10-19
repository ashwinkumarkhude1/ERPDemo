import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
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
  position!: string;
}