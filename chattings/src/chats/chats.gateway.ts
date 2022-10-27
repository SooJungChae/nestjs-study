import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Socket as SocketModel } from './models/sockets.model';
import { Repository } from 'typeorm';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(@InjectRepository(SocketModel) private socketRepository: Repository<SocketModel>) {}

  findOne(id: string): Promise<SocketModel> {
    return this.socketRepository.findOneBy({ id });
  }

  handleConnection(@ConnectedSocket() socket: Socket): any {
    console.log(socket.id);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    // const user = await this.findOne(socket.id);
    // console.log(user);
    // if (socket) {
    //   socket.broadcast.emit('disconnect_user', socket)
    // }
  }

  @SubscribeMessage('new_user')
  async handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    // TODO: username DB 에 적재
    // const isExistId = this.findOne(socket.id);
    // console.log('isExistId', isExistId);
    //
    // if (isExistId) {
    //   await this.socketRepository.create({
    //     id: socket.id,
    //     username
    //   })
    // }

    await this.socketRepository.create({
      id: socket.id,
      username
    })

    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('submit_chat')
  handleSubmitChat(@MessageBody() chat: string, @ConnectedSocket() socket: Socket) {
    socket.broadcast.emit('new_chat', {
      chat,
      username: socket.id
    });
  }
}
