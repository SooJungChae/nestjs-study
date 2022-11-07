import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import {
  Chatting as ChatModel,
  ChattingSchema,
} from './models/chattings.model';
import { Socket as SocketModel, SocketSchema } from './models/sockets.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatModel.name, schema: ChattingSchema },
      { name: SocketModel.name, schema: SocketSchema },
    ]),
  ],
  providers: [ChatsGateway],
})
export class ChatsModule {}
