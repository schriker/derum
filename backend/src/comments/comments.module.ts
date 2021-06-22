import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { EntriesModule } from 'src/entries/entries.module';
import { UsersModule } from 'src/users/users.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  exports: [CommentsService],
  imports: [
    TypeOrmModule.forFeature([Comment]),
    EntriesModule,
    UsersModule,
    CaslModule,
  ],
  providers: [CommentsService, CommentsResolver],
})
export class CommentsModule {}
