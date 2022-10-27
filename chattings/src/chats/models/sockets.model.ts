import { DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';

export class Socket {
  @PrimaryGeneratedColumn('uuid')
  _id: number;

  // socket id
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
