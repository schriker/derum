import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { NewArticleData } from './dto/new-article.input';
import { NewLinkData } from './dto/new-link.input';
import { QueryEntriesInput } from './dto/query.input';
import { Entry } from './entities/entry.entity';
import { EntriesService } from './services/entries.service';
import { DerumGuard } from '../common/guards/derum.guard';
import { EntriesQueryService } from './services/entries-query.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => Entry)
export class EntriesResolver {
  constructor(
    private entriesService: EntriesService,
    private entriesQueryService: EntriesQueryService,
    private usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => Entry)
  entry(
    @Args('entryId', { type: () => Int }) entryId: number,
    @CurrentUser() session: User,
  ) {
    return this.entriesQueryService.getSingle(entryId, session);
  }

  @Query(() => [Entry])
  entries(
    @Args('queryData') queryData: QueryEntriesInput,
    @CurrentUser() user: User,
  ) {
    return this.entriesQueryService.findMany(queryData, user);
  }

  @Mutation(() => Entry)
  @UseGuards(GQLSessionGuard, DerumGuard)
  createLink(
    @Args('newLinkData') newLinkData: NewLinkData,
    @CurrentUser() user: User,
  ): Promise<Entry> {
    return this.entriesService.createLink(newLinkData, user);
  }

  @Mutation(() => Entry)
  @UseGuards(GQLSessionGuard, DerumGuard)
  createArticle(
    @Args('newArticleData') newArticleData: NewArticleData,
    @Args('photo', { type: () => GraphQLUpload, nullable: true })
    photo: FileUpload,
    @CurrentUser() user: User,
  ): Promise<Entry> {
    return this.entriesService.createArticle(newArticleData, photo, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async deleteEntry(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() session: User,
  ): Promise<boolean> {
    const user = await this.usersService.getByIdBasic(session.id);
    const entry = await this.entriesQueryService.getById(id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Delete, entry)) throw new ForbiddenException();
    return this.entriesService.markDeleted(id);
  }

  @Query(() => [Entry])
  checkLinkExsits(
    @Args('roomId', { type: () => Int }) roomId: number,
    @Args('linkId', { type: () => Int }) linkId: number,
    @CurrentUser() session: User,
  ): Promise<Entry[]> {
    return this.entriesService.checkIfAlreadyAdded(linkId, roomId, session);
  }
}
