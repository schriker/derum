import { Injectable } from '@nestjs/common';
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

  findOneByName(name: string): Promise<Room> {
    return this.roomsRepository.findOne({ name });
  }

  findOneById(id: number): Promise<Room> {
    return this.roomsRepository.findOne({ id });
  }

  create(data: NewRoomInput): Promise<Room> {
    const room = new Room();
    room.name = data.name;
    room.description = data.description;

    return this.roomsRepository.save(room);
  }
}
