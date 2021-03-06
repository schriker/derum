import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { Comment } from 'src/comments/entities/comment.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SearchResult } from './dto/search-result';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  searchEntry(query: string): Promise<Entry[]> {
    return this.entriesRepository
      .createQueryBuilder('entry')
      .where('entry.document @@ to_tsquery(:query) AND entry.deleted = false', {
        query: `${query.trim().split(' ').join(' | ')}:*`,
      })
      .orderBy('ts_rank(entry.document, to_tsquery(:query))', 'DESC')
      .leftJoin('entry.comments', 'comments')
      .addSelect('COUNT(DISTINCT(comments.id))', 'entry_commentsNumber')
      .leftJoinAndSelect('entry.room', 'room')
      .leftJoinAndSelect('entry.photo', 'photo')
      .groupBy('entry.id')
      .addGroupBy('room.id')
      .addGroupBy('photo.id')
      .limit(30)
      .getMany();
  }

  searchComment(query: string): Promise<Comment[]> {
    return this.commentsRepository
      .createQueryBuilder('comment')
      .where(
        'comment.document @@ to_tsquery(:query) AND comment.deleted = false',
        {
          query: `${query.trim().split(' ').join(' | ')}:*`,
        },
      )
      .orderBy('ts_rank(comment.document, to_tsquery(:query))', 'DESC')
      .leftJoinAndSelect('comment.entry', 'entry')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('author.photo', 'photo')
      .leftJoinAndSelect('entry.room', 'room')
      .limit(30)
      .getMany();
  }

  searchUser(name: string): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.document @@ to_tsquery(:name) AND user.isBanned = false', {
        name: `${name.trim().split(' ').join(' | ')}:*`,
      })
      .orderBy('ts_rank(user.document, to_tsquery(:name))', 'DESC')
      .addOrderBy('length(user.displayName)', 'ASC')
      .leftJoinAndSelect('user.photo', 'photo')
      .limit(10)
      .getMany();
  }

  async search(query: string): Promise<SearchResult> {
    if (query.length) {
      const usersPromise = this.searchUser(query);
      const entiresPromise = this.searchEntry(query);
      const commentsPromise = this.searchComment(query);
      const [users, entries, comments] = await Promise.all([
        usersPromise,
        entiresPromise,
        commentsPromise,
      ]);

      return {
        users: users,
        entires: entries,
        comments: comments,
      };
    } else {
      return {
        users: [],
        entires: [],
        comments: [],
      };
    }
  }
}
