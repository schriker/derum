import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/common/guards/session-gql-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { CommentsService } from './comments.service';
import { NewCommentData } from './dto/new-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @Query(() => [Comment])
  comments(
    @Args('entryId', { type: () => Int }) entryId: number,
    @CurrentUser() session: User,
  ): Promise<Comment[]> {
    return this.commentsService.getByEntryId(entryId, session);
  }

  @Mutation(() => Comment)
  @UseGuards(GQLSessionGuard)
  async createComment(
    @Args('commentData') commentData: NewCommentData,
    @CurrentUser() session: User,
  ): Promise<Comment> {
    return this.commentsService.create(commentData, session);
  }
}
