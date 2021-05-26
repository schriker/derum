import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Room } from 'src/rooms/entities/room.entity';
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

  addOnlineUser(user: User, roomId: number, cId: string) {
    this.onlineUsers.push({
      roomId: roomId,
      userId: user.id,
      name: user.displayName,
      photo: user.photo,
      isAdmin: user.isAdmin,
      isModerator: user.isModerator,
      connectionId: cId,
    });
  }

  removeOnlineUser(cId: string) {
    this.onlineUsers = this.onlineUsers.filter(
      (online) => online.connectionId !== cId,
    );
  }

  getOnlineUsers(roomId: number): OnlineUser[] {
    const users = this.onlineUsers.filter((user) => user.roomId === roomId);
    return [...new Map(users.map((item) => [item['name'], item])).values()];
  }

  findById(id: number): Promise<User> {
    return this.usersRepository.findOne({ id });
  }

  async ignore(user: User, id: number): Promise<boolean> {
    try {
      await this.usersRepository
        .createQueryBuilder('user')
        .relation('ignore')
        .of(user)
        .add(id);
      return true;
    } catch (err) {
      throw new BadRequestException('Error ignoring user.');
    }
  }

  async removeIgnore(user: User, id: number): Promise<boolean> {
    await this.usersRepository
      .createQueryBuilder('user')
      .relation('ignore')
      .of(user)
      .remove(id);
    return true;
  }

  updateSession(ctx, user: User) {
    ctx.req.session.passport.user = user;
    ctx.req.session.save();
  }

  getJoinedRooms(user: User): Promise<Room[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .relation('joinedRooms')
      .of(user)
      .loadMany();
  }

  getIgnors(user: User): Promise<User[]> {
    return this.usersRepository
      .createQueryBuilder('user')
      .relation('ignore')
      .of(user)
      .loadMany();
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
      return userExists;
    }

    return this.createWithAuthProvider(userData);
  }
}
