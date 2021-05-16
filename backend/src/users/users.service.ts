import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { ProviderUser } from './dto/provider-user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createWithAuthProvider(userData: ProviderUser): Promise<User> {
    const { authId, authProvider, photo, email, displayName } = userData;
    const displayNameTaken = await this.usersRepository.find({
      displayName: ILike(displayName.replace(' ', '-')),
    });
    const user = new User();
    user.email = email;
    user.authId = authId;
    user.photo = photo;
    user.authProvider = authProvider;
    user.displayName = !displayNameTaken.length
      ? `${displayName.replace(' ', '-')}`
      : null;
    const savedUser = await this.usersRepository.save(user);
    if (displayNameTaken.length) {
      return this.usersRepository.save({
        ...savedUser,
        displayName: `${displayName.replace(' ', '-')}-${savedUser.id}`,
      });
    }
    return savedUser;
  }

  // async setDisplayName(displayName: string) {
  //   const displayNameTaken = await this.usersRepository.find({
  //     displayName: ILike(displayName),
  //   });
  //   if (displayNameTaken)
  //     throw new BadRequestException('Display name is already taken.');
  //   Find user, and set display name;
  // }

  async loginWithAuthProvider(userData: ProviderUser): Promise<User> {
    const userExists = await this.usersRepository.findOne({
      email: userData.email,
    });

    if (userExists) return userExists;

    return this.createWithAuthProvider(userData);
  }
}
