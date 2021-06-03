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

  async findMany(queryData: QueryEntriesInput): Promise<Entry[]> {
    const { roomName, limit, offset } = queryData;
    const room = await this.roomRepository.findOne({ name: ILike(roomName) });
    if (!room) throw new NotFoundException(roomName);
    return this.entryRepository.find({
      where: {
        room: room,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit > 25 ? 25 : limit,
      relations: ['author', 'photo', 'room'],
    });
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
}
