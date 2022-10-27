import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user')
  handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    return username;
  }
}
