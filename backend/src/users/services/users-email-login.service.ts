import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { EmailsService } from 'src/emails/emails.service';
import { Repository } from 'typeorm';
import { EmailLoginData } from '../dto/email-login.input';
import { NewUserData } from '../dto/new-user.input';
import { ResetPasswordData } from '../dto/reset-password.input';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';

@Injectable()
export class UsersEmailLoginService {
  constructor(
    private configService: ConfigService,
    private emailsService: EmailsService,
    private usersService: UsersService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createNewUser(data: NewUserData): Promise<boolean> {
    const displayNameTaken = await this.usersService.checkIfDisplayNameIsTaken(
      data.name,
    );
    if (displayNameTaken)
      throw new BadRequestException(ERROR_MESSAGES.DISPLAY_NAME_TAKEN);
    const userExists = await this.usersRepository.findOne({
      email: data.email,
    });
    if (userExists) throw new BadRequestException(ERROR_MESSAGES.EMAIL_TAKEN);
    try {
      const hashedPassword = await argon2.hash(data.password);
      const emailVerificationToken = jwt.sign(
        { email: data.email },
        this.configService.get<string>('JWT_SECRET'),
        {
          expiresIn: '72h',
        },
      );
      const user = new User();
      user.email = data.email;
      user.displayName = data.name;
      user.password = hashedPassword;
      user.authId = data.email;
      user.authProvider = 'email';
      user.emailVerificationToken = emailVerificationToken;
      await this.usersRepository.save(user);
      this.emailsService.sendVerification(user);
      return true;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async loginWithEmail(data: EmailLoginData): Promise<User> {
    const user = await this.usersRepository.findOne({
      email: data.email,
    });
    if (!user) throw new NotFoundException(ERROR_MESSAGES.USER_NOT_FOUND);
    if (!user.password)
      throw new BadRequestException(ERROR_MESSAGES.INVALID_PROVIDER);
    if (!user.verified) {
      const emailVerificationToken = jwt.sign(
        { email: data.email },
        this.configService.get<string>('JWT_SECRET'),
        {
          expiresIn: '72h',
        },
      );
      user.emailVerificationToken = emailVerificationToken;
      await this.usersRepository.save(user);
      this.emailsService.sendVerification(user);
      throw new BadRequestException(ERROR_MESSAGES.USER_NOT_VERIFIED);
    }

    if (!(await argon2.verify(user.password, data.password))) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_PASSWORD);
    }

    return user;
  }

  async verifyEmail(token: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.configService.get<string>('JWT_SECRET'),
        async (e) => {
          if (e)
            return reject(
              new BadRequestException(ERROR_MESSAGES.INVALID_TOKEN),
            );
          const user = await this.usersRepository.findOne({
            emailVerificationToken: token,
          });
          if (!user)
            return reject(
              new BadRequestException(ERROR_MESSAGES.EMAIL_ALREADY_VERIFIED),
            );
          user.verified = true;
          user.emailVerificationToken = null;
          await this.usersRepository.save(user);
          return resolve(true);
        },
      );
    });
  }

  async createResetPasswordToken(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({
      email,
    });
    if (user) {
      const passwordResetToken = jwt.sign(
        { email: email },
        this.configService.get<string>('JWT_SECRET'),
        {
          expiresIn: '24h',
        },
      );
      user.passwordResetToken = passwordResetToken;
      this.emailsService.sendPasswordReset(user);
      await this.usersRepository.save(user);
    }

    return true;
  }

  async resetPassword(data: ResetPasswordData): Promise<boolean> {
    return new Promise((resolve, reject) => {
      jwt.verify(
        data.token,
        this.configService.get<string>('JWT_SECRET'),
        async (e) => {
          if (e)
            return reject(
              new BadRequestException(ERROR_MESSAGES.INVALID_TOKEN),
            );
          const user = await this.usersRepository.findOne({
            passwordResetToken: data.token,
          });
          if (!user)
            return reject(
              new BadRequestException(ERROR_MESSAGES.INVALID_TOKEN),
            );
          const hashedPassword = await argon2.hash(data.password);
          user.passwordResetToken = null;
          user.password = hashedPassword;
          await this.usersRepository.save(user);
          return resolve(true);
        },
      );
    });
  }
}
