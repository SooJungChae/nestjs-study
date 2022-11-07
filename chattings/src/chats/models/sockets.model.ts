import { IsNotEmpty, IsString } from 'class-validator';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  id: false,
  timestamps: true,
};

@Schema(options)
export class Socket {
  @Prop({
    unique: true,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  // @Prop()
  // @DeleteDateColumn()
  // deletedAt: Date;
}

export const SocketSchema = SchemaFactory.createForClass(Socket);
