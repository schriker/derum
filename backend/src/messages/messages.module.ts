import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), RoomsModule, PubSubModule],
  providers: [MessagesService, MessagesResolver],
})
export class MessagesModule {}
