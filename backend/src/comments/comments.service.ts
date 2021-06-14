import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntriesService } from 'src/entries/entries.service';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { NewCommentData } from './dto/new-comment.input';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRespository: Repository<Comment>,
    private entriesService: EntriesService,
  ) {}

  async create(commentData: NewCommentData, user: User): Promise<Comment> {
    const { body, entryId, parentId } = commentData;
    const entry = await this.entriesService.getById(entryId);
    const comment = new Comment();
    comment.author = user;
    comment.body = body;
    comment.parentId = parentId;
    comment.entry = entry;

    return this.commentsRespository.save(comment);
  }
}
