import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesResolver } from './votes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Entry } from 'src/entries/entities/entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Entry])],
  providers: [VotesService, VotesResolver],
})
export class VotesModule {}
