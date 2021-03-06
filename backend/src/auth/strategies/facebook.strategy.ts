import * as FacebookTokenStrategy from 'passport-facebook-token';
import { BadRequestException, Injectable } from '@nestjs/common';
import { use } from 'passport';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/services/users.service';
import { ERROR_MESSAGES } from 'src/consts/error-messages';

@Injectable()
export class FacebookStrategy {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    this.init();
  }

  async init() {
    use(
      new FacebookTokenStrategy(
        {
          clientID: this.configService.get<string>('FACEBOOK_APP_ID'),
          clientSecret: this.configService.get<string>('FACEBOOK_APP_SECRET'),
          fbGraphVersion: 'v11.0',
        },
        async (
          _accessToken: string,
          _refreshToken: string,
          profile: any,
          done: any,
        ) => {
          try {
            if (!profile.emails[0].value) {
              throw new BadRequestException(ERROR_MESSAGES.EMAIL_REQUIRED);
            }
            const user = await this.usersService.loginWithAuthProvider({
              authId: profile.id,
              authProvider: profile.provider,
              email: profile.emails[0].value,
              photo: profile.photos[0].value,
              displayName: profile.displayName,
            });
            return done(null, user);
          } catch (err) {
            return done(err, null);
          }
        },
      ),
    );
  }
}
