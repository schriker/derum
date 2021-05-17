import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { NewDisplayNameData } from './dto/new-display-name';
import { ProviderUser } from './dto/provider-user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findById(user: User): Promise<User> {
    return this.usersRepository.findOne({ id: user.id });
  }

  updateSession(ctx, user: User) {
    ctx.req.session.passport.user = user;
    ctx.req.session.save();
  }

  async checkIfDisplayNameIsTaken(displayName: string): Promise<boolean> {
    const displayNameTaken = await this.usersRepository.find({
      displayName: ILike(displayName.replace(' ', '-')),
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
      ? `${displayName.replace(' ', '-')}`
      : null;
    const savedUser = await this.usersRepository.save(user);
    if (displayNameTaken) {
      return this.usersRepository.save({
        ...savedUser,
        displayName: `${displayName.replace(' ', '-')}-${savedUser.id}`,
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
      throw new BadRequestException('Display name is already taken.');
    return this.usersRepository.save({
      ...user,
      displayName: name,
    });
  }

  async loginWithAuthProvider(userData: ProviderUser): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      email: userData.email,
    });

    if (userExists) return userExists;

    return this.createWithAuthProvider(userData);
  }
}
