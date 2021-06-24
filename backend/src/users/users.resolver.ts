import { ForbiddenException, UseGuards } from '@nestjs/common';
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
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { FacebookAuthGuard } from 'src/common/guards/facebook-auth.guard';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { NewUserColor } from './dto/new-color';
import { NewDisplayNameData } from './dto/new-display-name';
import { NewSettingsData } from './dto/new-settings';
import { OnlineUser } from './dto/online-user';
import { ProviderUserInput } from './dto/provider-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => User)
  @UseGuards(GQLSessionGuard)
  me(@CurrentUser() user: User): Promise<User> {
    return this.usersService.getById(user.id);
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.getById(id);
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

  @Mutation(() => User)
  @UseGuards(GQLSessionGuard)
  async changeUserColor(
    @CurrentUser() currentUser: User,
    @Args() data: NewUserColor,
    @Context() ctx,
  ): Promise<User> {
    const user = await this.usersService.changeColor(data, currentUser);
    this.usersService.updateSession(ctx, user);
    return user;
  }

  @Mutation(() => User)
  @UseGuards(GQLSessionGuard)
  async updateUserSettings(
    @CurrentUser() currentUser: User,
    @Args('newSettingsData') data: NewSettingsData,
    @Context() ctx,
  ): Promise<User> {
    const user = await this.usersService.updateSettings(data, currentUser);
    this.usersService.updateSession(ctx, user);
    return user;
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async banUser(
    @CurrentUser() session: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    const user = await this.usersService.getByIdBasic(session.id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (!ability.can(Action.Manage, User)) throw new ForbiddenException();
    return this.usersService.ban(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async deleteUserContent(
    @CurrentUser() session: User,
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    const user = await this.usersService.getByIdBasic(session.id);
    const ability = this.caslAbilityFactory.createForUser(user);

    if (!ability.can(Action.Manage, User)) throw new ForbiddenException();
    return this.usersService.deleteContent(id);
  }

  @ResolveField()
  email(@CurrentUser() currentUser: User, @Parent() user: User): string {
    if (currentUser) return user.email;
    return '';
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
