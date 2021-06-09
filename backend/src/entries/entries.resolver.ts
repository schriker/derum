import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { NewArticleData } from './dto/new-article.input';
import { NewLinkData } from './dto/new-link.input';
import { QueryEntriesInput } from './dto/query.input';
import { Entry } from './entities/entry.entity';
import { EntriesService } from './entries.service';

@Resolver(() => Entry)
export class EntriesResolver {
  constructor(
    private entriesService: EntriesService,
    private usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => [Entry])
  entries(
    @Args('queryData') queryData: QueryEntriesInput,
    @CurrentUser() user: User,
  ) {
    return this.entriesService.findMany(queryData, user);
  }

  @Mutation(() => Entry)
  @UseGuards(GQLSessionGuard)
  createLink(
    @Args('newLinkData') newLinkData: NewLinkData,
    @CurrentUser() user: User,
  ): Promise<Entry> {
    return this.entriesService.createLink(newLinkData, user);
  }

  @Mutation(() => Entry)
  @UseGuards(GQLSessionGuard)
  createArticle(
    @Args('newArticleData') newArticleData: NewArticleData,
    @CurrentUser() user: User,
  ): Promise<Entry> {
    return this.entriesService.createArticle(newArticleData, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async deleteEntry(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() session: User,
  ): Promise<boolean> {
    const user = await this.usersService.getById(session.id);
    const entry = await this.entriesService.getById(id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Delete, entry)) throw new ForbiddenException();
    return this.entriesService.markDeleted(id);
  }

  @Query(() => [Entry])
  checkLinkExsits(
    @Args('roomId', { type: () => Int }) roomId: number,
    @Args('linkId', { type: () => Int }) linkId: number,
  ): Promise<Entry[]> {
    return this.entriesService.checkIfAlreadyAdded(linkId, roomId);
  }
}
