import { ForbiddenException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Resolver,
  Query,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { GQLThrottlerGuard } from 'src/common/guards/gql-throttle.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { CommentsService } from './comments.service';
import { NewCommentData } from './dto/new-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private commentsService: CommentsService,
    private usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => [Comment])
  comments(
    @Args('entryId', { type: () => Int }) entryId: number,
    @Args('sticky', { defaultValue: false }) sticky: boolean,
    @CurrentUser() session: User,
  ): Promise<Comment[]> {
    return this.commentsService.getByEntryId(entryId, session, sticky);
  }

  @Query(() => Comment)
  comment(
    @Args('commentId', { type: () => Int }) commentId: number,
  ): Promise<Comment> {
    return this.commentsService.getById(commentId);
  }

  @Mutation(() => Comment)
  @UseGuards(GQLSessionGuard, GQLThrottlerGuard)
  @Throttle(1, 20)
  async createComment(
    @Args('commentData') commentData: NewCommentData,
    @CurrentUser() session: User,
  ): Promise<Comment> {
    const user = await this.usersService.getByIdBasic(session.id);
    return this.commentsService.create(commentData, user);
  }

  @ResolveField()
  body(@Parent() comment: Comment) {
    if (comment.deleted) return null;
    return comment.body;
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async toggleCommentSticky(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() session: User,
  ): Promise<boolean> {
    const user = await this.usersService.getByIdBasic(session.id);
    const comment = await this.commentsService.getByIdWithRoomAuthor(id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Update, comment.entry.room))
      throw new ForbiddenException();

    return this.commentsService.toggleSticky(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async deleteComment(
    @Args('commentId', { type: () => Int }) commentId: number,
    @CurrentUser() session: User,
  ): Promise<boolean> {
    const user = await this.usersService.getByIdBasic(session.id);
    const comment = await this.commentsService.getByIdWithRoomAuthor(commentId);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Delete, comment)) throw new ForbiddenException();
    return this.commentsService.markDeleted(commentId);
  }
}
