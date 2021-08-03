import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/comment.entity';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { ILike, Repository } from 'typeorm';
import { NewUserColor } from '../dto/new-color';
import { NewDisplayNameData } from '../dto/new-display-name';
import { NewSettingsData } from '../dto/new-settings';
import { OnlineUser } from '../dto/online-user';
import { ProviderUser } from '../dto/provider-user.interface';
import { UserSession } from '../entities/user-session.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private onlineUsers: OnlineUser[] = [];

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>,
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(UserSession)
    private userSessionsRepository: Repository<UserSession>,
  ) {}

  addOnlineUser(user: User, roomId: number, cId: string) {
    this.onlineUsers.push({
      roomId: roomId,
      userId: user.id,
      name: user.displayName,
      photo: user.photo ? user.photo : null,
      isAdmin: user.isAdmin,
      isModerator: user.isModerator,
      isBanned: user.isBanned,
      connectionId: cId,
      color: user.color,
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

  async ban(userId: number): Promise<boolean> {
    const user = await this.getByIdBasic(userId);
    user.isBanned = !user.isBanned;
    await this.usersRepository.save(user);
    return true;
  }

  async deleteContent(userId: number): Promise<boolean> {
    const user = await this.getByIdBasic(userId);
    await this.commentsRepository.delete({
      author: user,
    });
    await this.votesRepository.delete({
      user: user,
    });
    await this.messagesRepository.delete({
      author: user,
    });
    await this.entriesRepository
      .createQueryBuilder('entry')
      .leftJoinAndSelect('entry.author', 'author')
      .update(Entry)
      .where('author.id = :id', {
        id: user.id,
      })
      .set({ deleted: true })
      .execute();
    return true;
  }

  async getById(id: number): Promise<User> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.photo', 'photo')
      .leftJoinAndSelect('user.ignore', 'ignore')
      .leftJoinAndSelect('user.joinedRooms', 'joinedRooms')
      .leftJoinAndSelect('joinedRooms.photo', 'roomPhoto')
      .leftJoinAndSelect('joinedRooms.author', 'roomAuthor')
      .loadRelationCountAndMap('joinedRooms.usersNumber', 'joinedRooms.users')
      .getOne();
    return user;
  }

  async getByIdBasic(id: number): Promise<User> {
    return this.usersRepository.findOne(id, { relations: ['photo'] });
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
      throw new BadRequestException(ERROR_MESSAGES.IGNORE_USER);
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
    const { authId, authProvider, email, displayName } = userData;
    const displayNameTaken = await this.checkIfDisplayNameIsTaken(
      userData.displayName,
    );
    const user = new User();
    user.email = email;
    user.authId = authId;
    user.verified = true;
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
      where: {
        email: userData.email,
      },
      relations: ['photo'],
    });

    if (userExists) {
      return userExists;
    }

    return this.createWithAuthProvider(userData);
  }

  async saveSession(req: any): Promise<UserSession> {
    const ip =
      req.headers['x-forwarded-for']?.split(',').shift() ||
      req.socket?.remoteAddress;
    const sessionId = req.sessionID;
    const user = req.user as User;
    const userAgent = req.headers['user-agent'];

    const sessionExists = await this.userSessionsRepository.findOne({
      sessionId,
    });

    if (sessionExists) return sessionExists;

    const session = new UserSession();
    session.ip = ip;
    session.sessionId = sessionId;
    session.user = user;
    session.userAgent = userAgent;

    return this.userSessionsRepository.save(session);
  }

  async changeColor(data: NewUserColor, session: User): Promise<User> {
    const user = await this.getByIdBasic(session.id);
    user.color = data.color;
    return this.usersRepository.save(user);
  }

  async checkIfIgnored(user: User, userToCheck: User): Promise<boolean> {
    const ignored = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: user.id })
      .leftJoinAndSelect('user.ignore', 'ignore')
      .where('ignore.id = :id', { id: userToCheck.id })
      .getMany();
    return !!ignored.length;
  }

  async updateSettings(data: NewSettingsData, session: User): Promise<User> {
    if (!Object.keys(data).length) return session;
    const user = await this.getByIdBasic(session.id);

    for (const key in data) {
      user[key] = data[key];
    }

    return this.usersRepository.save(user);
  }

  async countUserPoints(user: User): Promise<number> {
    const { points } = await this.usersRepository
      .createQueryBuilder()
      .addSelect((subQuery) => {
        return subQuery
          .select('COALESCE(SUM(value), 0)')
          .from(Vote, 'vote')
          .where('vote.pointForId = :id', {
            id: user.id,
          });
      }, 'points')
      .getRawOne();

    return points;
  }

  async countUserEntries(user: User): Promise<number> {
    const number = await this.entriesRepository.count({
      where: {
        author: user,
        deleted: false,
      },
    });
    return number;
  }

  async countUserComments(user: User): Promise<number> {
    const number = await this.commentsRepository.count({
      where: {
        author: user,
        deleted: false,
      },
    });
    return number;
  }

  async countUserMessages(user: User): Promise<number> {
    const number = await this.messagesRepository.count({
      where: {
        author: user,
      },
    });
    return number;
  }

  async createdRooms(user: User): Promise<Room[]> {
    const rooms = await this.roomsRepository
      .createQueryBuilder('room')
      .where('room.authorId = :author', {
        author: user.id,
      })
      .orderBy('LOWER (room.name)', 'ASC')
      .leftJoinAndSelect('room.author', 'author')
      .leftJoinAndSelect('room.photo', 'photo')
      .leftJoin('room.users', 'users')
      .groupBy('room.id')
      .addGroupBy('photo.id')
      .addGroupBy('author.id')
      .loadRelationCountAndMap('room.usersNumber', 'room.users')
      .getMany();

    return rooms;
  }

  async updatePhoto(photo: Photo, session: User): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: {
        id: session.id,
      },
      relations: ['photo'],
    });
    user.photo = photo;
    await this.usersRepository.save(user);
  }
}
