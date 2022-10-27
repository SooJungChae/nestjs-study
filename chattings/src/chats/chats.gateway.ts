import {ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class ChatsGateway {
  @SubscribeMessage('new_user')
  handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    // TODO: username DB 에 적재
    socket.broadcast.emit('user_connected', username);
    return username;
  }
}
