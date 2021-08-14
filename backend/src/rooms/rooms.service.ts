import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Photo } from 'src/photos/entities/photo.entity';
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

  getRoomsNames(): Promise<Room[]> {
    return this.roomsRepository.find();
  }

  async findOneByName(name: string): Promise<Room> {
    const room = await this.roomsRepository
      .createQueryBuilder('room')
      .where('room.name ILIKE :name', { name })
      .leftJoinAndSelect('room.author', 'author')
      .leftJoinAndSelect('room.photo', 'photo')
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
      .leftJoinAndSelect('room.photo', 'photo')
      .getOne();
    if (!room) {
      throw new NotFoundException(id);
    }
    return room;
  }

  searchRoomsByName(name: string): Promise<Room[]> {
    return this.roomsRepository
      .createQueryBuilder('room')
      .where('room.name ILIKE :name AND room.name NOT ILIKE :derum', {
        name: `${name}%`,
        derum: 'Derum',
      })
      .addSelect('COUNT(users.id) as usersNumber')
      .leftJoin('room.users', 'users')
      .leftJoinAndSelect('room.photo', 'photo')
      .groupBy('room.id')
      .addGroupBy('photo.id')
      .orderBy('usersNumber', 'DESC')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
      .limit(15)
      .getMany();
  }

  getNewest(): Promise<Room[]> {
    return this.roomsRepository
      .createQueryBuilder('room')
      .orderBy('room.createdAt', 'DESC')
      .limit(5)
      .leftJoinAndSelect('room.author', 'author')
      .leftJoinAndSelect('room.photo', 'photo')
      .leftJoin('room.users', 'users')
      .groupBy('room.id')
      .addGroupBy('photo.id')
      .addGroupBy('author.id')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
      .getMany();
  }

  getMostPopular(limit: number): Promise<Room[]> {
    return this.roomsRepository
      .createQueryBuilder('room')
      .where('room.name NOT LIKE :name', { name: 'Derum' })
      .addSelect('COUNT(users.id) as usersNumber')
      .leftJoinAndSelect('room.author', 'author')
      .leftJoinAndSelect('room.photo', 'photo')
      .leftJoin('room.users', 'users')
      .groupBy('room.id')
      .addGroupBy('author.id')
      .addGroupBy('photo.id')
      .orderBy('usersNumber', 'DESC')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
      .limit(limit > 20 ? 20 : limit)
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
    room.author = user;
    room.usersNumber = 1;
    room.name = data.name;
    room.description = data.description;

    const createdRoom = await this.roomsRepository.save(room);
    await this.join(user, createdRoom.id);
    return createdRoom;
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
      throw new BadRequestException(ERROR_MESSAGES.JOINING_ROOM);
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

  async updatePhoto(photo: Photo, id: number): Promise<void> {
    const room = await this.findOneById(id);
    room.photo = photo;
    await this.roomsRepository.save(room);
  }
}
