import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewRoomInput } from './dto/new-room.input';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async findOneByName(name: string): Promise<Room> {
    const room = await this.roomsRepository.findOne({ name });
    if (!room) {
      throw new NotFoundException(name);
    }
    return room;
  }

  async findOneById(id: number): Promise<Room> {
    const room = await this.roomsRepository.findOne({ id });
    if (!room) {
      throw new NotFoundException(id);
    }
    return room;
  }

  create(data: NewRoomInput): Promise<Room> {
    const room = new Room();
    room.name = data.name;
    room.description = data.description;

    return this.roomsRepository.save(room);
  }
}
