import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from 'src/rooms/rooms.service';
import { User } from 'src/users/entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { NewMessageInput } from './dto/new-message.input';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    private roomsService: RoomsService,
  ) {}

  async create(data: NewMessageInput, author: User): Promise<Message> {
    const room = await this.roomsService.findOneById(data.roomId);
    const message = new Message();
    message.room = room;
    message.body = data.body;
    message.author = author;

    return this.messagesRepository.save(message);
  }

  async getById(messageId: number): Promise<Message> {
    const message = await this.messagesRepository
      .createQueryBuilder('message')
      .where('message.id = :messageId', { messageId })
      .leftJoinAndSelect('message.author', 'author')
      .leftJoinAndSelect('message.room', 'room')
      .getOne();
    if (!message) throw new NotFoundException(messageId);
    return message;
  }

  getByRoomId(roomId: number): Promise<Message[]> {
    return this.messagesRepository
      .createQueryBuilder('message')
      .where('message.roomId = :roomId', { roomId })
      .leftJoinAndSelect('message.author', 'author')
      .orderBy('message.createdAt', 'DESC')
      .limit(100)
      .getMany();
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.messagesRepository.delete({ id });
  }
}
