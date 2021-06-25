import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntriesQueryService } from 'src/entries/services/entries-query.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { User } from 'src/users/entities/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Repository } from 'typeorm';
import { NewCommentData } from './dto/new-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRespository: Repository<Comment>,
    private entriesQueryService: EntriesQueryService,
    private notificationsService: NotificationsService,
  ) {}

  async getById(id: number): Promise<Comment> {
    const comment = await this.commentsRespository
      .createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .leftJoinAndSelect('comment.author', 'commentAuthor')
      .getOne();
    if (!comment) throw new NotFoundException();
    return comment;
  }

  async create(commentData: NewCommentData, user: User): Promise<Comment> {
    const { body, entryId, parentId } = commentData;
    const entry = await this.entriesQueryService.getById(entryId);
    const comment = new Comment();
    comment.author = user;
    comment.body = body;
    comment.parentId = parentId;
    comment.entry = entry;

    const newComment = await this.commentsRespository.save(comment);

    if (!parentId) {
      this.notificationsService.createForNewComment(entry, user, newComment);
    } else {
      const parentComment = await this.getById(parentId);
      this.notificationsService.createForReply(
        entry,
        parentComment,
        user,
        newComment,
      );
    }
    return newComment;
  }

  async markDeleted(id: number): Promise<boolean> {
    const comment = await this.getById(id);
    comment.deleted = true;
    await this.commentsRespository.save(comment);
    return true;
  }

  async getByEntryId(entryId: number, user: User): Promise<Comment[]> {
    return this.commentsRespository
      .createQueryBuilder('comment')
      .where('comment.entryId = :entryId', {
        entryId,
      })
      .leftJoin('comment.votes', 'votes')
      .addSelect('COALESCE(SUM(votes.value), 0)', 'score')
      .orderBy('score', 'DESC', 'NULLS LAST')
      .addOrderBy('comment.createdAt', 'DESC')
      .addSelect((subQuery) => {
        return subQuery
          .select('COALESCE(SUM(value), 0)')
          .from(Vote, 'vote')
          .where('vote.commentId = comment.id');
      }, 'comment_voteScore')
      .addSelect((subQuery) => {
        return subQuery
          .select('value')
          .from(Vote, 'vote')
          .where('vote.commentId = comment.id AND vote.userId = :userId', {
            userId: user ? user.id : null,
          });
      }, 'comment_userVote')
      .leftJoinAndSelect('comment.author', 'author')
      .groupBy('comment.id')
      .addGroupBy('author.id')
      .getMany();
  }
}
