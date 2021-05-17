import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ILike, Repository } from 'typeorm';
import { NewRoomInput } from './dto/new-room.input';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async findOneByName(name: string): Promise<Room> {
    const room = await this.roomsRepository
      .createQueryBuilder('room')
      .where('room.name = :name', { name })
      .leftJoinAndSelect('room.author', 'author')
      .getOne();
    if (!room) {
      throw new NotFoundException(name);
    }
    return room;
  }

  async findOneById(id: number): Promise<Room> {
    const room = await this.roomsRepository
      .createQueryBuilder('room')
      .where('room.id = :id', { id })
      .leftJoinAndSelect('room.author', 'author')
      .getOne();
    if (!room) {
      throw new NotFoundException(id);
    }
    return room;
  }

  async create(data: NewRoomInput, user: User): Promise<Room> {
    const roomExists = await this.roomsRepository.find({
      name: ILike(data.name),
    });
    if (roomExists.length) {
      throw new BadRequestException(ERROR_MESSAGES.ROOM_EXISTS);
    }
    const room = new Room();
    room.name = data.name;
    room.description = data.description;
    room.author = user;

    return this.roomsRepository.save(room);
  }
}
