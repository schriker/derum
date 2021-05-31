import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { NewLinkData } from './dto/new-link.input';
import { Entry } from './entities/entry.entity';
import { EntriesService } from './entries.service';

@Resolver(() => Entry)
export class EntriesResolver {
  constructor(private entriesService: EntriesService) {}

  @Mutation(() => Entry)
  @UseGuards(GQLSessionGuard)
  createLink(
    @Args('newLinkData') newLinkData: NewLinkData,
    @CurrentUser() user: User,
  ): Promise<Entry> {
    return this.entriesService.createLink(newLinkData, user);
  }

  @Query(() => [Entry])
  checkLinkExsits(
    @Args('roomId', { type: () => Int }) roomId: number,
    @Args('linkId', { type: () => Int }) linkId: number,
  ): Promise<Entry[]> {
    return this.entriesService.checkIfAlreadyAdded(linkId, roomId);
  }
}
