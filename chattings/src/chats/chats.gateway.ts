import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Socket as SocketModel } from './models/sockets.model';
import { InjectModel } from '@nestjs/mongoose';
import { Chatting } from './models/chattings.model';
import { Model } from 'mongoose';

@WebSocketGateway()
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name) private socketModel: Model<SocketModel>) {}

  async findOne(id: string) {
    return this.socketModel.findOne({ id });
  }

  handleConnection(@ConnectedSocket() socket: Socket): any {
    console.log(socket.id);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    const user = await this.findOne(socket.id);
    console.log('disconnect', user);

    if (user) {
      await user.delete();

      socket.broadcast.emit('disconnect_user', user.username);
    }
  }

  @SubscribeMessage('new_user')
  async handleNewUser(@MessageBody() username: string, @ConnectedSocket() socket: Socket) {
    const isExistUsername = await this.socketModel.findOne({ username });
    const newUserName = isExistUsername ? `${username}${Math.random()}` : username;

    await this.socketModel.create({
      id: socket.id,
      username: newUserName
    })

    socket.broadcast.emit('user_connected', newUserName);
    return newUserName;
  }

  @SubscribeMessage('submit_chat')
  async handleSubmitChat(@MessageBody() chat: string, @ConnectedSocket() socket: Socket) {
    const socketObj = await this.findOne(socket.id);

    await this.chattingModel.create({
      user: socketObj,
      chat
    });

    socket.broadcast.emit('new_chat', {
      chat,
      username: socket.id
    });
  }
}
