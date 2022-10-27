import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Socket} from "./socket.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Socket])],
  exports: [TypeOrmModule]
})
export class SocketsModule {}
