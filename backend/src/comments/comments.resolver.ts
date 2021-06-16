import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
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
  ): Promise<Comment[]> {
    return this.commentsService.getByEntryId(entryId);
  }

  @Mutation(() => Comment)
  @UseGuards(GQLSessionGuard)
  createComment(
    @Args('commentData') commentData: NewCommentData,
    @CurrentUser() session: User,
  ): Promise<Comment> {
    // Check if BAN
    return this.commentsService.create(commentData, session);
  }
}
