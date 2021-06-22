import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  registerEnumType,
  Resolver,
} from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { VoteResult } from './dto/vote-result';
import { Vote } from './entities/vote.entity';
import { VoteValueEnum } from './types/value.enum';
import { VotesService } from './votes.service';

registerEnumType(VoteValueEnum, {
  name: 'VoteValueEnum',
});

@Resolver(() => Vote)
export class VotesResolver {
  constructor(private votesService: VotesService) {}

  @Mutation(() => VoteResult)
  @UseGuards(GQLSessionGuard)
  vote(
    @CurrentUser() user: User,
    @Args('entryId', { type: () => Int }) entryId: number,
    @Args('value', { type: () => VoteValueEnum }) value: VoteValueEnum,
  ): Promise<VoteResult> {
    return this.votesService.vote(user, entryId, value);
  }

  @Mutation(() => VoteResult)
  @UseGuards(GQLSessionGuard)
  voteComment(
    @CurrentUser() user: User,
    @Args('commentId', { type: () => Int }) commentId: number,
    @Args('value', { type: () => VoteValueEnum }) value: VoteValueEnum,
  ): Promise<VoteResult> {
    return this.votesService.voteComment(user, commentId, value);
  }
}
