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
import { v4 as uuidv4 } from 'uuid';
import trimString from 'src/helpers/trimString';
import { QueryEntriesInput } from './dto/query.input';
import { Vote } from 'src/votes/entities/vote.entity';
import { EntrySort } from './types/entry-sort.enum';
import { NewArticleData } from './dto/new-article.input';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private photosService: PhotosService,
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

  getNewest(
    queryData: QueryEntriesInput,
    room: Room,
    user: User,
  ): Promise<Entry[]> {
    const { limit, offset } = queryData;
    const whereQuery =
      offset > 0
        ? 'entry.roomId = :roomId AND entry.id < :offset AND entry.deleted = false'
        : 'entry.roomId = :roomId AND entry.deleted = false';
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

    return this.entryRepository
      .createQueryBuilder('entry')
      .where('entry.roomId = :roomId AND entry.deleted = false', {
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
    const { description, title, photo, roomId, linkId } = newLinkData;
    const isLinkAdded = await this.checkIfAlreadyAdded(linkId, roomId);
    if (isLinkAdded.length)
      throw new BadRequestException(ERROR_MESSAGES.LINK_EXISTS);
    const link = await this.linkRepository.findOne({ id: newLinkData.linkId });
    const room = await this.roomRepository.findOne({ id: newLinkData.roomId });
    if (!link || !room) throw new NotFoundException();
    const savedPhoto = await this.photosService.savePhotoFromLink(photo, user);
    const entry = new Entry();
    const trimedTitle = trimString(title, 60);
    entry.slug = `${slugify(trimedTitle, {
      lower: true,
    }).replace(/[^0-9a-zA-Z]/g, '')}-${uuidv4()}`;
    entry.author = user;
    entry.description = description;
    entry.link = link;
    entry.publisher = link.publisher;
    entry.title = title;
    entry.url = link.url;
    entry.type = EntryType.LINK;
    entry.room = room;
    entry.photo = savedPhoto;
    return this.entryRepository.save(entry);
  }

  async createArticle(
    newArticleData: NewArticleData,
    user: User,
  ): Promise<Entry> {
    const { roomId, photo, title, description } = newArticleData;
    let savedPhoto = null;
    const room = await this.roomRepository.findOne({
      id: roomId,
    });
    if (!room) throw new NotFoundException();
    if (photo) {
      savedPhoto = await this.photosService.savePhotoFromLink(photo, user);
    }
    const entry = new Entry();
    const trimedTitle = trimString(title, 60);
    entry.slug = `${slugify(trimedTitle, {
      lower: true,
      strict: true,
    }).replace(/[^0-9a-zA-Z]/g, '-')}-${uuidv4()}`;
    entry.author = user;
    entry.description = description;
    entry.title = title;
    entry.type = EntryType.ARTICLE;
    entry.room = room;
    entry.photo = savedPhoto;
    return this.entryRepository.save(entry);
  }

  async markDeleted(id: number): Promise<boolean> {
    const entry = await this.getById(id);
    entry.deleted = true;
    await this.entryRepository.save(entry);
    return true;
  }
}
