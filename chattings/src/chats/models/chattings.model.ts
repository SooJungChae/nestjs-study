import { DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Socket as SocketModel } from './sockets.model';

@Entity()
export class Chatting {
  // updatedAt, deletedAt 자동으로 찍기
  // _id, user, chat
  @PrimaryGeneratedColumn('uuid')
  _id: number;

  // socket id
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  user: SocketModel;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
