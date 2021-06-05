import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from 'src/entries/entities/entry.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { VoteResult } from './dto/vote-result';
import { Vote } from './entities/vote.entity';
import { VoteValueEnum } from './types/value.enum';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
  ) {}

  async vote(
    user: User,
    entryId: number,
    value: VoteValueEnum,
  ): Promise<VoteResult> {
    const entry = await this.entriesRepository.findOne({ id: entryId });
    if (!entry) throw new NotFoundException(entryId);

    const alreadyVoted = await this.votesRepository.findOne({
      where: {
        user: user,
        entry: entry,
      },
    });

    if (alreadyVoted) {
      await this.votesRepository.save({ ...alreadyVoted, value: value });
    } else {
      const vote = new Vote();
      vote.entry = entry;
      vote.user = user;
      vote.value = value;
      await this.votesRepository.save(vote);
    }

    const voteScore = await this.votesRepository
      .createQueryBuilder('vote')
      .where('vote.entryId = :entryId', { entryId })
      .select('SUM(vote.value)', 'value')
      .getRawOne();
    return {
      userValue: value,
      voteScore: voteScore.value,
    };
  }
}
