import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DataSource} from "typeorm";
import {SocketsModule} from './sockets/sockets.module';
import {ConfigModule} from '@nestjs/config';
import {ChatsModule} from './chats/chats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: 'chat',
      entities: [],
      synchronize: true
    }),
    SocketsModule,
    ChatsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {

  }
  // chattings.model
  // _id, user, chat
  // user: _id, id, username
}
