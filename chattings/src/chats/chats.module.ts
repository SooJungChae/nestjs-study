import { Module } from '@nestjs/common';
import {ChatsGateway} from "./chats.gateway";
import { SocketsModule } from '../sockets/sockets.module';

@Module({
  imports: [SocketsModule],
  providers: [ChatsGateway],
})
export class ChatsModule {}
