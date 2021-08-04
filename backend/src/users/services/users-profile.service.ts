import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Repository } from 'typeorm';
import { NewUserColor } from '../dto/new-color';
import { NewDisplayNameData } from '../dto/new-display-name';
import { NewSettingsData } from '../dto/new-settings';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class UsersProfileService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async updatePhoto(photo: Photo, session: User): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        id: session.id,
      },
      relations: ['photo'],
    });
    user.photo = photo;
    await this.usersRepository.save(user);
  }

  async updateSettings(data: NewSettingsData, session: User): Promise<User> {
    if (!Object.keys(data).length) return session;
    const user = await this.usersService.getByIdBasic(session.id);

    for (const key in data) {
      user[key] = data[key];
    }

    return this.usersRepository.save(user);
  }

  async changeColor(data: NewUserColor, session: User): Promise<User> {
    const user = await this.usersService.getByIdBasic(session.id);
    user.color = data.color;
    return this.usersRepository.save(user);
  }

  async changeDisplayName(
    user: User,
    { name }: NewDisplayNameData,
  ): Promise<User> {
    const displayNameTaken = await this.usersService.checkIfDisplayNameIsTaken(
      name,
    );
    if (displayNameTaken)
      throw new BadRequestException(ERROR_MESSAGES.DISPLAY_NAME_TAKEN);
    return this.usersRepository.save({
      ...user,
      displayName: name,
    });
  }

  async createdRooms(user: User): Promise<Room[]> {
    const rooms = await this.roomsRepository
      .createQueryBuilder('room')
      .where('room.authorId = :author', {
        author: user.id,
      })
      .orderBy('LOWER (room.name)', 'ASC')
      .leftJoinAndSelect('room.author', 'author')
      .leftJoinAndSelect('room.photo', 'photo')
      .leftJoin('room.users', 'users')
      .groupBy('room.id')
      .addGroupBy('photo.id')
      .addGroupBy('author.id')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
      .getMany();

    return rooms;
  }

  async countUserPoints(user: User): Promise<number> {
    const { points } = await this.usersRepository
      .createQueryBuilder()
      .addSelect((subQuery) => {
        return subQuery
          .select('COALESCE(SUM(value), 0)')
          .from(Vote, 'vote')
          .where('vote.pointForId = :id', {
            id: user.id,
          });
      }, 'points')
      .getRawOne();

    return points;
  }

  async countUserEntries(user: User): Promise<number> {
    const number = await this.entriesRepository.count({
      where: {
        author: user,
        deleted: false,
      },
    });
    return number;
  }

  async countUserComments(user: User): Promise<number> {
    const number = await this.commentsRepository.count({
      where: {
        author: user,
        deleted: false,
      },
    });
    return number;
  }

  async countUserMessages(user: User): Promise<number> {
    const number = await this.messagesRepository.count({
      where: {
        author: user,
      },
    });
    return number;
  }

  getUserMessages(offsetId: number, userId: number): Promise<Message[]> {
    const whereQuery =
      offsetId > 0
        ? 'message.authorId = :userId AND message.id < :offset'
        : 'message.authorId = :userId';

    return this.messagesRepository
      .createQueryBuilder('message')
      .where(whereQuery, {
        userId: userId,
        offset: offsetId,
      })
      .leftJoinAndSelect('message.author', 'author')
      .leftJoinAndSelect('message.room', 'room')
      .leftJoinAndSelect('author.photo', 'photo')
      .addOrderBy('message.createdAt', 'DESC')
      .take(70)
      .getMany();
  }

  getUserEntries(
    offsetId: number,
    userId: number,
    session: User,
  ): Promise<Entry[]> {
    const whereQuery =
      offsetId > 0
        ? 'entry.authorId = :userId AND entry.id < :offset'
        : 'entry.authorId = :userId';
    return this.entriesRepository
      .createQueryBuilder('entry')
      .where(whereQuery, {
        userId: userId,
        offset: offsetId,
      })
      .orderBy('entry.createdAt', 'DESC')
      .addSelect((subQuery) => {
        return subQuery
          .select('COALESCE(SUM(value), 0)')
          .from(Vote, 'vote')
          .where('vote.entryId = entry.id');
      }, 'entry_voteScore')
      .addSelect((subQuery) => {
        return subQuery
          .select('value')
          .from(Vote, 'vote')
          .where('vote.entryId = entry.id AND vote.userId = :sessionId', {
            sessionId: session ? session.id : null,
          });
      }, 'entry_userVote')
      .leftJoin('entry.comments', 'comments')
      .addSelect('COUNT(DISTINCT(comments.id))', 'entry_commentsNumber')
      .leftJoinAndSelect('entry.room', 'room')
      .leftJoinAndSelect('room.author', 'roomAuthor')
      .leftJoinAndSelect('entry.author', 'author')
      .groupBy('entry.id')
      .addGroupBy('author.id')
      .addGroupBy('room.id')
      .addGroupBy('roomAuthor.id')
      .addOrderBy('entry.createdAt', 'DESC')
      .take(20)
      .getMany();
  }

  getUserComments(
    offsetId: number,
    userId: number,
    session: User,
  ): Promise<Comment[]> {
    const whereQuery =
      offsetId > 0
        ? 'comment.authorId = :userId AND comment.id < :offset'
        : 'comment.authorId = :userId';
    return this.commentsRepository
      .createQueryBuilder('comment')
      .where(whereQuery, {
        userId: userId,
        offset: offsetId,
      })
      .leftJoinAndSelect('comment.entry', 'entry')
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
          .where('vote.commentId = comment.id AND vote.userId = :sessionId', {
            sessionId: session ? session.id : null,
          });
      }, 'comment_userVote')
      .leftJoinAndSelect('comment.author', 'author')
      .leftJoinAndSelect('author.photo', 'photo')
      .groupBy('comment.id')
      .addGroupBy('author.id')
      .addGroupBy('photo.id')
      .addGroupBy('entry.id')
      .addOrderBy('comment.createdAt', 'DESC')
      .take(20)
      .getMany();
  }
}
