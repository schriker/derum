import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
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
      .where('room.name ILIKE :name', { name })
      .leftJoinAndSelect('room.author', 'author')
      .leftJoinAndSelect('room.users', 'users')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
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
      .leftJoinAndSelect('room.users', 'users')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
      .getOne();
    if (!room) {
      throw new NotFoundException(id);
    }
    return room;
  }

  getNewest(): Promise<Room[]> {
    return this.roomsRepository
      .createQueryBuilder('room')
      .orderBy('room.createdAt', 'DESC')
      .limit(5)
      .leftJoinAndSelect('room.author', 'author')
      .leftJoin('room.users', 'users')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
      .getMany();
  }

  getMostPopular(): Promise<Room[]> {
    return this.roomsRepository
      .createQueryBuilder('room')
      .addSelect('COUNT(users.id) as usersNumber')
      .leftJoinAndSelect('room.author', 'author')
      .leftJoin('room.users', 'users')
      .groupBy('room.id')
      .addGroupBy('author.id')
      .orderBy('usersNumber', 'DESC')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
      .limit(5)
      .getMany();
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

  async join(user: User, roomId: number): Promise<boolean> {
    try {
      await this.roomsRepository
        .createQueryBuilder('room')
        .relation('users')
        .of(roomId)
        .add(user);
      return true;
    } catch (err) {
      throw new BadRequestException('Error while joining room.');
    }
  }

  async leave(user: User, roomId: number): Promise<boolean> {
    await this.roomsRepository
      .createQueryBuilder('room')
      .relation('users')
      .of(roomId)
      .remove(user);
    return true;
  }
}
