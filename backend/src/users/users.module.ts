import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSession } from './entities/user-session.entity';
import { CaslModule } from 'src/casl/casl.module';
import { Comment } from 'src/comments/entities/comment.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Message } from 'src/messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserSession,
      Comment,
      Entry,
      Vote,
      Message,
    ]),
    CaslModule,
  ],
  exports: [UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
