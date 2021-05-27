import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Resolver,
  Query,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { FacebookAuthGuard } from 'src/auth/guards/facebook-auth.guard';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { Room } from 'src/rooms/entities/room.entity';
import { CurrentUser } from './decorators/currentUser.decorator';
import { NewDisplayNameData } from './dto/new-display-name';
import { OnlineUser } from './dto/online-user';
import { ProviderUserInput } from './dto/provider-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  @UseGuards(GQLSessionGuard)
  me(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findById(user.id);
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findById(id);
  }

  @Query(() => [OnlineUser])
  onlineUsers(@Args('roomId', { type: () => Int }) roomId: number) {
    return this.usersService.getOnlineUsers(roomId);
  }

  @Mutation(() => Boolean)
  @UseGuards(FacebookAuthGuard)
  loginUserWithFacebook(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args() UserData: ProviderUserInput,
  ): boolean {
    return true;
  }

  @Mutation(() => Boolean)
  logout(@Context() ctx) {
    ctx.req.logout();
    return true;
  }

  @Mutation(() => User)
  @UseGuards(GQLSessionGuard)
  async changeUserDisplayName(
    @CurrentUser() user: User,
    @Args() displayName: NewDisplayNameData,
    @Context() ctx,
  ): Promise<User> {
    const savedUser = await this.usersService.changeDisplayName(
      user,
      displayName,
    );
    this.usersService.updateSession(ctx, savedUser);
    return savedUser;
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  ignoreUser(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.usersService.ignore(currentUser, id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  removeIgnoreUser(
    @CurrentUser() currentUser: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.usersService.removeIgnore(currentUser, id);
  }

  @ResolveField()
  email(@CurrentUser() currentUser: User, @Parent() user: User): string {
    if (currentUser) return user.email;
    return '';
  }

  @ResolveField()
  joinedRooms(
    @CurrentUser() currentUser: User,
    @Parent() user: User,
  ): Promise<Room[]> | [] {
    if (currentUser) return this.usersService.getJoinedRooms(user);
    return [];
  }

  @ResolveField()
  ignore(
    @CurrentUser() currentUser: User,
    @Parent() user: User,
  ): Promise<User[]> | [] {
    if (currentUser) return this.usersService.getIgnors(user);
    return [];
  }
}
