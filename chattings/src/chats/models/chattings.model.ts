import { IsNotEmpty, IsString } from 'class-validator';
import { Socket as SocketModel } from './sockets.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  id: false,
  timestamps: true,
};

@Schema(options)
export class Chatting extends Document {
  // socket id
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @Prop({
    required: true,
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
      id: { type: String },
      username: { type: String, required: true },
    },
  })
  user: SocketModel;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat: string;

  // @DeleteDateColumn()
  // deletedAt: Date;
}

export const ChattingSchema = SchemaFactory.createForClass(Chatting);
