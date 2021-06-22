import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/common/guards/session-gql-auth.guard';
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

  @Query(() => [Room])
  newRooms(): Promise<Room[]> {
    return this.roomsService.getNewest();
  }

  @Query(() => [Room])
  searchRooms(@Args('name') name: string): Promise<Room[]> {
    return this.roomsService.searchRoomsByName(name);
  }

  @Query(() => [Room])
  popularRooms(
    @Args('limit', { type: () => Int }) limit: number,
  ): Promise<Room[]> {
    return this.roomsService.getMostPopular(limit);
  }

  @Mutation(() => Room)
  @UseGuards(GQLSessionGuard)
  createRoom(
    @Args('newRoomData') newRoomData: NewRoomInput,
    @CurrentUser() user: User,
  ): Promise<Room> {
    return this.roomsService.create(newRoomData, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  joinRoom(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) roomId: number,
  ) {
    return this.roomsService.join(user, roomId);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  leaveRoom(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) roomId: number,
  ) {
    return this.roomsService.leave(user, roomId);
  }
}
