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
import { Throttle } from '@nestjs/throttler';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { Comment } from 'src/comments/entities/comment.entity';
import { FacebookAuthGuard } from 'src/common/guards/facebook-auth.guard';
import { GoogleAuthGuard } from 'src/common/guards/google-auth.guard';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { GQLThrottlerGuard } from 'src/common/guards/gql-throttle.guard';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { CurrentUser } from './decorators/currentUser.decorator';
import { EmailLoginData } from './dto/email-login.input';
import { NewUserColor } from './dto/new-color';
import { NewDisplayNameData } from './dto/new-display-name';
import { NewPasswordData } from './dto/new-password.input';
import { NewSettingsData } from './dto/new-settings';
import { NewUserData } from './dto/new-user.input';
import { OnlineUser } from './dto/online-user';
import { ProviderUserInput } from './dto/provider-user.input';
import { ResetPasswordData } from './dto/reset-password.input';
import { User } from './entities/user.entity';
import { UsersEmailLoginService } from './services/users-email-login.service';
import { UsersProfileService } from './services/users-profile.service';
import { UsersService } from './services/users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private usersProfileService: UsersProfileService,
    private usersEmailLoginService: UsersEmailLoginService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Query(() => User)
  @UseGuards(GQLSessionGuard)
  me(@CurrentUser() user: User): Promise<User> {
    return this.usersService.getById(user.id);
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.usersService.getByIdBasic(id);
  }

  @Query(() => [Entry])
  userEntries(
    @Args('offsetId', { type: () => Int }) offsetId: number,
    @Args('userId', { type: () => Int }) userId: number,
    @CurrentUser() session: User,
  ): Promise<Entry[]> {
    return this.usersProfileService.getUserEntries(offsetId, userId, session);
  }

  @Query(() => [Comment])
  userComments(
    @Args('offsetId', { type: () => Int }) offsetId: number,
    @Args('userId', { type: () => Int }) userId: number,
    @CurrentUser() session: User,
  ): Promise<Comment[]> {
    return this.usersProfileService.getUserComments(offsetId, userId, session);
  }

  @Query(() => [Message])
  userMessages(
    @Args('offsetId', { type: () => Int }) offsetId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Message[]> {
    return this.usersProfileService.getUserMessages(offsetId, userId);
  }

  @Query(() => [OnlineUser])
  onlineUsers(
    @Args('roomId', { type: () => Int }) roomId: number,
  ): OnlineUser[] {
    return this.usersService.getOnlineUsers(roomId);
  }

  @UseGuards(GQLThrottlerGuard)
  @Throttle(100, 60 * 60 * 24)
  @Mutation(() => Boolean)
  createNewUser(
    @Args('newUserData') newUserData: NewUserData,
  ): Promise<boolean> {
    return this.usersEmailLoginService.createNewUser(newUserData);
  }

  @Mutation(() => Boolean)
  verifyUserEmail(@Args('token') token: string): Promise<boolean> {
    return this.usersEmailLoginService.verifyEmail(token);
  }

  @UseGuards(GQLThrottlerGuard)
  @Throttle(1, 60 * 15)
  @Mutation(() => Boolean)
  createResetPasswordToken(@Args('email') email: string): Promise<boolean> {
    return this.usersEmailLoginService.createResetPasswordToken(email);
  }

  @Mutation(() => Boolean)
  resetUserPassword(
    @Args('resetPasswordData') data: ResetPasswordData,
  ): Promise<boolean> {
    return this.usersEmailLoginService.resetPassword(data);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  changeUserPassword(
    @Args('changePasswordData') data: NewPasswordData,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.usersEmailLoginService.changePassword(data, user);
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
  @UseGuards(GoogleAuthGuard)
  loginUserWithGoogle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args() UserData: ProviderUserInput,
  ): boolean {
    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(LocalAuthGuard, GQLThrottlerGuard)
  @Throttle(200, 60 * 60 * 24)
  loginUserWithEmail(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args() UserData: EmailLoginData,
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
    const savedUser = await this.usersProfileService.changeDisplayName(
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
    const user = await this.usersProfileService.changeColor(data, currentUser);
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
    const user = await this.usersProfileService.updateSettings(
      data,
      currentUser,
    );
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
  points(@Parent() user: User): Promise<number> {
    return this.usersProfileService.countUserPoints(user);
  }

  @ResolveField()
  entriesNumber(@Parent() user: User): Promise<number> {
    return this.usersProfileService.countUserEntries(user);
  }

  @ResolveField()
  commentsNumber(@Parent() user: User): Promise<number> {
    return this.usersProfileService.countUserComments(user);
  }

  @ResolveField()
  messagesNumber(@Parent() user: User): Promise<number> {
    return this.usersProfileService.countUserMessages(user);
  }

  @ResolveField()
  createdRooms(@Parent() user: User): Promise<Room[]> {
    return this.usersProfileService.createdRooms(user);
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
