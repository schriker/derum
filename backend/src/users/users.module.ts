import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSession } from './entities/user-session.entity';
import { CaslModule } from 'src/casl/casl.module';
import { Comment } from 'src/comments/entities/comment.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Message } from 'src/messages/entities/message.entity';
import { UsersEmailLoginService } from './services/users-email-login.service';

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
  exports: [UsersService, UsersEmailLoginService],
  providers: [UsersService, UsersEmailLoginService, UsersResolver],
})
export class UsersModule {}
