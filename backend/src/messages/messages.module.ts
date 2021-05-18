import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    RoomsModule,
    PubSubModule,
    CaslModule,
  ],
  providers: [MessagesService, MessagesResolver],
})
export class MessagesModule {}
