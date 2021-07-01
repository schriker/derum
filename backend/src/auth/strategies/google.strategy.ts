import * as GoogleTokenStrategy from 'passport-google-token';
import { BadRequestException, Injectable } from '@nestjs/common';
import { use } from 'passport';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { ERROR_MESSAGES } from 'src/consts/error-messages';

@Injectable()
export class GoogleStrategy {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    this.init();
  }

  async init() {
    use(
      new GoogleTokenStrategy.Strategy(
        {
          clientID: this.configService.get<string>('GOOGLE_APP_ID'),
          clientSecret: this.configService.get<string>('GOOGLE_APP_SECRET'),
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
              photo: profile._json.picture,
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
