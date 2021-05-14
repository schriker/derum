import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { NewRoomInput } from './dto/new-room.input';
import { Room } from './entities/room.entity';
import { RoomsService } from './rooms.service';

@Resolver(() => Room)
export class RoomsResolver {
  constructor(private roomsService: RoomsService) {}

  @Query(() => Room)
  room(@Args('name') name: string): Promise<Room> {
    return this.roomsService.findOneByName(name);
  }

  @Mutation(() => Room)
  createRoom(@Args('newRoomData') newRoomData: NewRoomInput): Promise<Room> {
    return this.roomsService.create(newRoomData);
  }
}
