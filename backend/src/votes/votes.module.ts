import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesResolver } from './votes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { EntriesModule } from 'src/entries/entries.module';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vote]),
    EntriesModule,
    CommentsModule,
    UsersModule,
  ],
  providers: [VotesService, VotesResolver],
})
export class VotesModule {}
