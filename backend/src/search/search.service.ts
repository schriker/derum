import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private comments: Repository<Comment>,
  ) {}

  searchUser(name: string): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('document @@ to_tsquery(:name)', {
        name: `${name}:*`,
      })
      .orderBy('ts_rank(document, to_tsquery(:name))', 'DESC')
      .leftJoinAndSelect('user.photo', 'photo')
      .limit(50)
      .getMany();
  }

  async search(query: string): Promise<SearchResult> {
    const usersPromise = this.searchUser(query);

    const [users] = await Promise.all([usersPromise]);

    return {
      users: users,
      entires: [],
      comments: [],
    };
  }
}
