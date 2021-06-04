import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from 'src/entries/entities/entry.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { ValueEnum } from './types/value.enum';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
  ) {}

  async vote(user: User, entryId: number, value: ValueEnum): Promise<Vote> {
    const entry = await this.entriesRepository.findOne({ id: entryId });
    if (!entry) throw new NotFoundException(entryId);

    const alreadyVoted = await this.votesRepository.findOne({
      where: {
        user: user,
        entry: entry,
      },
      relations: ['entry'],
    });

    if (alreadyVoted)
      return this.votesRepository.save({ ...alreadyVoted, value: value });

    const vote = new Vote();
    vote.entry = entry;
    vote.user = user;
    vote.value = value;
    return this.votesRepository.save(vote);
  }
}
