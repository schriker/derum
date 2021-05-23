import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { ILike, Repository } from 'typeorm';
import { NewDisplayNameData } from './dto/new-display-name';
import { OnlineUser } from './dto/online-user';
import { ProviderUser } from './dto/provider-user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private onlineUsers: OnlineUser[] = [];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  addOnlineUser(user: User) {
    const isUserOnline = this.onlineUsers.some((online) => {
      return online.userId === user.id;
    });
    if (!isUserOnline) {
      this.onlineUsers.push({
        userId: user.id,
        name: user.displayName,
        photo: user.photo,
      });
    }
  }

  removeOnlineUser(user: User) {
    this.onlineUsers = this.onlineUsers.filter(
      (online) => online.userId !== user.id,
    );
  }

  getOnlineUsers(): OnlineUser[] {
    return this.onlineUsers;
  }

  findById(user: User): Promise<User> {
    return this.usersRepository.findOne({ id: user.id });
  }

  updateSession(ctx, user: User) {
    ctx.req.session.passport.user = user;
    ctx.req.session.save();
  }

  async checkIfDisplayNameIsTaken(displayName: string): Promise<boolean> {
    const displayNameTaken = await this.usersRepository.find({
      displayName: ILike(displayName.replace(' ', '_')),
    });
    if (displayNameTaken.length) return true;
    return false;
  }

  async createWithAuthProvider(userData: ProviderUser): Promise<User> {
    const { authId, authProvider, photo, email, displayName } = userData;
    const displayNameTaken = await this.checkIfDisplayNameIsTaken(
      userData.displayName,
    );
    const user = new User();
    user.email = email;
    user.authId = authId;
    user.photo = photo;
    user.authProvider = authProvider;
    user.displayName = !displayNameTaken
      ? `${displayName.replace(' ', '_')}`
      : null;
    const savedUser = await this.usersRepository.save(user);
    if (displayNameTaken) {
      return this.usersRepository.save({
        ...savedUser,
        displayName: `${displayName.replace(' ', '_')}${savedUser.id}`,
      });
    }
    this.addOnlineUser(savedUser);
    return savedUser;
  }

  async changeDisplayName(
    user: User,
    { name }: NewDisplayNameData,
  ): Promise<User> {
    const displayNameTaken = await this.checkIfDisplayNameIsTaken(name);
    if (displayNameTaken)
      throw new BadRequestException(ERROR_MESSAGES.DISPLAY_NAME_TAKEN);
    return this.usersRepository.save({
      ...user,
      displayName: name,
    });
  }

  async loginWithAuthProvider(userData: ProviderUser): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      email: userData.email,
    });

    if (userExists) {
      this.addOnlineUser(userExists);
      return userExists;
    }

    return this.createWithAuthProvider(userData);
  }
}
