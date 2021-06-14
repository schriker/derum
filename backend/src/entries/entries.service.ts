import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import slugify from 'slugify';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Link } from 'src/meta-scraper/entities/link.entity';
import { PhotosService } from 'src/photos/photos.service';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { NewLinkData } from './dto/new-link.input';
import { Entry } from './entities/entry.entity';
import { EntryType } from './types/entry-type.enum';
import trimString from 'src/helpers/trimString';
import { QueryEntriesInput } from './dto/query.input';
import { Vote } from 'src/votes/entities/vote.entity';
import { EntrySort } from './types/entry-sort.enum';
import { NewArticleData } from './dto/new-article.input';
import { BlacklistPublisher } from 'src/blacklist-publishers/entities/blacklist-publisher.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(BlacklistPublisher)
    private blacklistPublisherRepository: Repository<BlacklistPublisher>,
    private photosService: PhotosService,
    private configService: ConfigService,
  ) {}

  async getById(id: number): Promise<Entry> {
    const entry = await this.entryRepository
      .createQueryBuilder('entry')
      .where('entry.id = :id', { id })
      .leftJoinAndSelect('entry.room', 'room')
      .leftJoinAndSelect('room.author', 'roomAuthor')
      .getOne();
    if (!entry) throw new NotFoundException();
    return entry;
  }

  createSlug(title: string): string {
    const trimedTitle = trimString(title, 100);
    return `${slugify(trimedTitle, {
      lower: true,
      strict: true,
    }).replace(/[^0-9a-zA-Z]/g, '-')}`;
  }

  getNewest(
    queryData: QueryEntriesInput,
    room: Room,
    user: User,
  ): Promise<Entry[]> {
    const { limit, offset } = queryData;
    const isHomePage =
      parseInt(this.configService.get<string>('HOME_ROOM_ID')) === room.id;
    let whereQuery =
      offset > 0
        ? 'entry.roomId = :roomId AND entry.id < :offset AND entry.deleted = false'
        : 'entry.roomId = :roomId AND entry.deleted = false';
    if (isHomePage) {
      whereQuery =
        offset > 0
          ? 'entry.id < :offset AND entry.deleted = false'
          : 'entry.deleted = false';
    }
    return this.entryRepository
      .createQueryBuilder('entry')
      .where(whereQuery, {
        roomId: room.id,
        offset,
      })
      .orderBy('entry.createdAt', 'DESC')
      .take(limit > 25 ? 25 : limit)
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(value)')
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

    let whereQuery = 'entry.roomId = :roomId AND entry.deleted = false';
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
      .groupBy('entry.id')
      .orderBy('score', 'DESC', 'NULLS LAST')
      .addOrderBy('entry.createdAt', 'DESC')
      .leftJoinAndSelect('entry.author', 'author')
      .leftJoinAndSelect('entry.photo', 'photo')
      .leftJoinAndSelect('entry.room', 'room')
      .addGroupBy('author.id')
      .addGroupBy('photo.id')
      .addGroupBy('room.id')
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(value)')
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
      .getMany();
  }

  async findMany(queryData: QueryEntriesInput, user: User): Promise<Entry[]> {
    const { roomName } = queryData;
    const room = await this.roomRepository.findOne({ name: ILike(roomName) });
    if (!room) throw new NotFoundException(roomName);
    switch (queryData.sort) {
      case EntrySort.NEW:
        return this.getNewest(queryData, room, user);
      case EntrySort.BEST:
        return this.getBest(queryData, room, user);
    }
  }

  async checkIfBlacklistedPublisher(name: string): Promise<BlacklistPublisher> {
    const isBlacklisted = await this.blacklistPublisherRepository.findOne({
      name: ILike(`%${name}%`),
    });
    if (isBlacklisted)
      throw new BadRequestException(ERROR_MESSAGES.PUBLISHER_BLACKLISTED);
    return isBlacklisted;
  }

  checkIfAlreadyAdded(linkId: number, roomId: number): Promise<Entry[]> {
    return this.entryRepository.find({
      where: {
        room: roomId,
        link: linkId,
      },
      relations: ['author', 'photo', 'room'],
    });
  }

  async createLink(newLinkData: NewLinkData, user: User): Promise<Entry> {
    const { description, title, roomId, linkId } = newLinkData;
    const isLinkAdded = await this.checkIfAlreadyAdded(linkId, roomId);
    if (isLinkAdded.length)
      throw new BadRequestException(ERROR_MESSAGES.LINK_EXISTS);
    const link = await this.linkRepository.findOne({ id: newLinkData.linkId });
    await this.checkIfBlacklistedPublisher(link.publisher);
    const room = await this.roomRepository.findOne({
      id: newLinkData.roomId,
    });
    if (!link || !room) throw new NotFoundException();
    let photo = null;
    if (link.photo) {
      photo = await this.photosService.savePhotoFromLink(link.photo, user);
    }
    const entry = new Entry();
    entry.slug = this.createSlug(title);
    entry.author = user;
    entry.description = description;
    entry.link = link;
    entry.publisher = link.publisher;
    entry.title = title;
    entry.url = link.url;
    entry.type = EntryType.LINK;
    entry.room = room;
    entry.photo = photo;
    return this.entryRepository.save(entry);
  }

  async createArticle(
    newArticleData: NewArticleData,
    user: User,
  ): Promise<Entry> {
    const { roomId, title, description } = newArticleData;
    const room = await this.roomRepository.findOne({
      id: roomId,
    });
    if (!room) throw new NotFoundException();
    const entry = new Entry();
    entry.slug = this.createSlug(title);
    entry.author = user;
    entry.description = description;
    entry.title = title;
    entry.type = EntryType.ARTICLE;
    entry.room = room;
    return this.entryRepository.save(entry);
  }

  async markDeleted(id: number): Promise<boolean> {
    const entry = await this.getById(id);
    entry.deleted = true;
    await this.entryRepository.save(entry);
    return true;
  }
}
