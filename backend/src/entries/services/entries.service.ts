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
import { User } from 'src/users/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { NewLinkData } from '../dto/new-link.input';
import { Entry } from '../entities/entry.entity';
import { EntryType } from '../types/entry-type.enum';
import trimString from 'src/helpers/trimString';
import { Vote } from 'src/votes/entities/vote.entity';
import { NewArticleData } from '../dto/new-article.input';
import { BlacklistPublisher } from 'src/blacklist-publishers/entities/blacklist-publisher.entity';
import { EntriesQueryService } from './entries-query.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
    private roomsService: RoomsService,
    @InjectRepository(BlacklistPublisher)
    private blacklistPublisherRepository: Repository<BlacklistPublisher>,
    private photosService: PhotosService,
    private entriesQueryService: EntriesQueryService,
  ) {}

  createSlug(title: string): string {
    const trimedTitle = trimString(title, 100);
    return `${slugify(trimedTitle, {
      lower: true,
      strict: true,
    }).replace(/[^0-9a-zA-Z]/g, '-')}`;
  }

  async checkIfBlacklistedPublisher(name: string): Promise<BlacklistPublisher> {
    const isBlacklisted = await this.blacklistPublisherRepository.findOne({
      name: ILike(`%${name}%`),
    });
    if (isBlacklisted)
      throw new BadRequestException(ERROR_MESSAGES.PUBLISHER_BLACKLISTED);
    return isBlacklisted;
  }

  checkIfAlreadyAdded(
    linkId: number,
    roomId: number,
    user: User,
  ): Promise<Entry[]> {
    return this.entryRepository
      .createQueryBuilder('entry')
      .where('entry.linkId = :linkId AND entry.roomId = :roomId', {
        linkId,
        roomId,
      })
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
      .getMany();
  }
  async createLink(newLinkData: NewLinkData, user: User): Promise<Entry> {
    const { description, title, roomId, linkId } = newLinkData;
    const isLinkAdded = await this.checkIfAlreadyAdded(linkId, roomId, user);
    if (isLinkAdded.length)
      throw new BadRequestException(ERROR_MESSAGES.LINK_EXISTS);
    const link = await this.linkRepository.findOne({ id: newLinkData.linkId });
    await this.checkIfBlacklistedPublisher(link.publisher);
    const room = await this.roomsService.findOneById(roomId);
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
    photo: FileUpload,
    user: User,
  ): Promise<Entry> {
    const { roomId, title, description, body } = newArticleData;
    const room = await this.roomsService.findOneById(roomId);
    const entry = new Entry();
    if (photo) {
      const savedPhoto = await this.photosService.saveArticlePhoto(photo, user);
      entry.photo = savedPhoto;
    }
    entry.slug = this.createSlug(title);
    entry.author = user;
    entry.body = body;
    entry.description = description;
    entry.title = title;
    entry.type = EntryType.ARTICLE;
    entry.room = room;
    return this.entryRepository.save(entry);
  }

  async markDeleted(id: number): Promise<boolean> {
    const entry = await this.entriesQueryService.getById(id);
    entry.deleted = true;
    await this.entryRepository.save(entry);
    return true;
  }
}
