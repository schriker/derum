import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Link } from 'src/meta-scraper/entities/link.entity';
import { PhotosService } from 'src/photos/photos.service';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { NewLinkData } from './dto/new-link.input';
import { Entry } from './entities/entry.entity';
import { EntryType } from './types/entry-type.enum';

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

  async checkIfAlreadyAdded(linkId: number, roomId: number): Promise<Entry[]> {
    return await this.entryRepository.find({
      where: {
        room: roomId,
        link: linkId,
      },
      relations: ['author', 'photo'],
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
