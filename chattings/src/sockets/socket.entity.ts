import {Column, PrimaryGeneratedColumn} from "typeorm";

export class Socket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;
}
