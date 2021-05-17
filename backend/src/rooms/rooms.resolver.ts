import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
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
  @UseGuards(GQLSessionGuard)
  createRoom(
    @Args('newRoomData') newRoomData: NewRoomInput,
    @CurrentUser() user: User,
  ): Promise<Room> {
    return this.roomsService.create(newRoomData, user);
  }
}
