import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  registerEnumType,
  Resolver,
} from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { Vote } from './entities/vote.entity';
import { VoteValueEnum } from './types/value.enum';
import { VotesService } from './votes.service';

registerEnumType(VoteValueEnum, {
  name: 'VoteValueEnum',
});

@Resolver(() => Vote)
export class VotesResolver {
  constructor(private votesService: VotesService) {}

  @Mutation(() => Vote)
  @UseGuards(GQLSessionGuard)
  vote(
    @CurrentUser() user: User,
    @Args('entryId', { type: () => Int }) entryId: number,
    @Args('value', { type: () => VoteValueEnum }) value: VoteValueEnum,
  ): Promise<Vote> {
    return this.votesService.vote(user, entryId, value);
  }
}
