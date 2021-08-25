import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import rawQueryToEntity from 'src/helpers/rawQueryToEntity';
import { Room } from 'src/rooms/entities/room.entity';
import { RoomsService } from 'src/rooms/rooms.service';
import { User } from 'src/users/entities/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Repository } from 'typeorm';
import { QueryEntriesInput } from '../dto/query.input';
import { Entry } from '../entities/entry.entity';
import { homeEntiresNewestQuery } from '../sql/home-entries-newest.sql';
import { EntrySort } from '../types/entry-sort.enum';

@Injectable()
export class EntriesQueryService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    private roomsService: RoomsService,
    private configService: ConfigService,
  ) {}

  async getById(id: number): Promise<Entry> {
    const entry = await this.entryRepository
      .createQueryBuilder('entry')
      .where('entry.id = :id', { id })
      .leftJoinAndSelect('entry.author', 'author')
      .leftJoinAndSelect('entry.room', 'room')
      .leftJoinAndSelect('room.author', 'roomAuthor')
      .getOne();
    if (!entry) throw new NotFoundException();
    return entry;
  }

  async getSingle(id: number, user: User): Promise<Entry> {
    const entry = await this.entryRepository
      .createQueryBuilder('entry')
      .where('entry.id = :id', { id })
      .leftJoin('entry.comments', 'comments')
      .addSelect('COUNT(DISTINCT(comments.id))', 'entry_commentsNumber')
      .leftJoinAndSelect('entry.room', 'room')
      .leftJoinAndSelect('entry.author', 'author')
      .leftJoinAndSelect('entry.photo', 'photo')
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
          .where('vote.entryId = entry.id AND vote.userId = :userId', {
            userId: user ? user.id : null,
          });
      }, 'entry_userVote')
      .groupBy('entry.id')
      .addGroupBy('author.id')
      .addGroupBy('photo.id')
      .addGroupBy('room.id')
      .getOne();
    if (!entry) throw new NotFoundException();
    return entry;
  }

  async getNewest(
    queryData: QueryEntriesInput,
    room: Room,
    user: User,
  ): Promise<Entry[]> {
    const { limit, offset } = queryData;
    const take = limit > 25 ? 25 : limit;
    const isHomePage =
      parseInt(this.configService.get<string>('HOME_ROOM_ID')) === room.id;
    const whereQuery =
      offset > 0
        ? 'entry.roomId = :roomId AND entry.id < :offset AND entry.deleted = false AND entry.sticky = false'
        : 'entry.roomId = :roomId AND entry.deleted = false AND entry.sticky = false';

    const homeResult = await this.entryRepository.query(
      homeEntiresNewestQuery(offset > 0 ? 'AND ("entry"."id" < $3)' : ''),
      offset > 0
        ? [user ? user.id : null, take, offset]
        : [user ? user.id : null, take],
    );

    if (isHomePage)
      return this.entryRepository.create(
        rawQueryToEntity(Entry, homeResult as Record<string, unknown>[]),
      );

    return this.entryRepository
      .createQueryBuilder('entry')
      .where(whereQuery, {
        roomId: room.id,
        offset,
      })
      .take(take)
      .orderBy('entry.createdAt', 'DESC')
      .leftJoin('entry.comments', 'comments')
      .addSelect('COUNT(DISTINCT(comments.id))', 'entry_commentsNumber')
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
          .where('vote.entryId = entry.id AND vote.userId = :userId', {
            userId: user ? user.id : null,
          });
      }, 'entry_userVote')
      .leftJoinAndSelect('entry.author', 'author')
      .leftJoinAndSelect('entry.photo', 'photo')
      .leftJoinAndSelect('entry.room', 'room')
      .groupBy('entry.id')
      .addGroupBy('author.id')
      .addGroupBy('photo.id')
      .addGroupBy('room.id')
      .getMany();
  }

  getBest(
    queryData: QueryEntriesInput,
    room: Room,
    user: User,
  ): Promise<Entry[]> {
    const { limit, offset } = queryData;

    const isHomePage =
      parseInt(this.configService.get<string>('HOME_ROOM_ID')) === room.id;

    let whereQuery =
      'entry.roomId = :roomId AND entry.deleted = false AND entry.sticky = false';
    if (isHomePage) {
      whereQuery = 'entry.deleted = false';
    }

    return this.entryRepository
      .createQueryBuilder('entry')
      .where(whereQuery, {
        roomId: room.id,
      })
      .leftJoin('entry.votes', 'votes')
      .addSelect('COALESCE(SUM(votes.value), 0)', 'score')
      .leftJoin('entry.comments', 'comments')
      .addSelect('COUNT(DISTINCT(comments.id))', 'entry_commentsNumber')
      .groupBy('entry.id')
      .orderBy('score', 'DESC', 'NULLS LAST')
      .addOrderBy('entry.createdAt', 'DESC')
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
          .where('vote.entryId = entry.id AND vote.userId = :userId', {
            userId: user ? user.id : null,
          });
      }, 'entry_userVote')
      .skip(offset)
      .take(limit > 25 ? 25 : limit)
      .leftJoinAndSelect('entry.author', 'author')
      .leftJoinAndSelect('entry.photo', 'photo')
      .leftJoinAndSelect('entry.room', 'room')
      .addGroupBy('author.id')
      .addGroupBy('photo.id')
      .addGroupBy('room.id')
      .getMany();
  }

  async getSticky(roomName: string, user: User): Promise<Entry[]> {
    const room = await this.roomsService.findOneByName(roomName);

    const whereQuery =
      'entry.roomId = :roomId AND entry.sticky = true AND entry.deleted = false';

    return this.entryRepository
      .createQueryBuilder('entry')
      .where(whereQuery, {
        roomId: room.id,
      })
      .leftJoin('entry.votes', 'votes')
      .addSelect('COALESCE(SUM(votes.value), 0)', 'score')
      .leftJoin('entry.comments', 'comments')
      .addSelect('COUNT(DISTINCT(comments.id))', 'entry_commentsNumber')
      .groupBy('entry.id')
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
          .where('vote.entryId = entry.id AND vote.userId = :userId', {
            userId: user ? user.id : null,
          });
      }, 'entry_userVote')
      .leftJoinAndSelect('entry.author', 'author')
      .leftJoinAndSelect('entry.photo', 'photo')
      .leftJoinAndSelect('entry.room', 'room')
      .addGroupBy('author.id')
      .addGroupBy('photo.id')
      .addGroupBy('room.id')
      .getMany();
  }

  async findMany(queryData: QueryEntriesInput, user: User): Promise<Entry[]> {
    const { roomName } = queryData;
    const room = await this.roomsService.findOneByName(roomName);
    switch (queryData.sort) {
      case EntrySort.NEW:
        return this.getNewest(queryData, room, user);
      case EntrySort.BEST:
        return this.getBest(queryData, room, user);
    }
  }
}
