import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsService } from 'src/comments/comments.service';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { EntriesQueryService } from 'src/entries/services/entries-query.service';
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
    private commentsService: CommentsService,
    private entiriesQueryService: EntriesQueryService,
  ) {}

  async vote(
    user: User,
    entryId: number,
    value: VoteValueEnum,
  ): Promise<VoteResult> {
    const entry = await this.entiriesQueryService.getById(entryId);

    if (entry.author.id === user.id)
      throw new BadRequestException(ERROR_MESSAGES.CANNOT_SELF_VOTE);

    if (entry.deleted)
      return {
        userValue: VoteValueEnum.NONE,
        voteScore: 0,
      };

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
      vote.pointFor = entry.author;
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

  async voteComment(
    user: User,
    commentId: number,
    value: VoteValueEnum,
  ): Promise<VoteResult> {
    const comment = await this.commentsService.getById(commentId);

    if (comment.author.id === user.id)
      throw new BadRequestException(ERROR_MESSAGES.CANNOT_SELF_VOTE);

    if (comment.deleted)
      return {
        userValue: VoteValueEnum.NONE,
        voteScore: 0,
      };

    const alreadyVoted = await this.votesRepository.findOne({
      where: {
        user: user,
        comment: comment,
      },
    });

    if (alreadyVoted) {
      await this.votesRepository.save({ ...alreadyVoted, value: value });
    } else {
      const vote = new Vote();
      vote.comment = comment;
      vote.user = user;
      vote.value = value;
      vote.pointFor = comment.author;
      await this.votesRepository.save(vote);
    }

    const voteScore = await this.votesRepository
      .createQueryBuilder('vote')
      .where('vote.commentId = :commentId', { commentId })
      .select('SUM(vote.value)', 'value')
      .getRawOne();
    return {
      userValue: value,
      voteScore: voteScore.value,
    };
  }
}
