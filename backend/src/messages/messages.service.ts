import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from 'src/rooms/rooms.service';
import { Repository } from 'typeorm';
import { NewMessageInput } from './dto/new-message.input';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    private roomsService: RoomsService,
  ) {}

  async create(data: NewMessageInput): Promise<Message> {
    const room = await this.roomsService.findOneById(data.roomId);
    const message = new Message();
    message.room = room;
    message.body = data.body;

    return this.messagesRepository.save(message);
  }
}
