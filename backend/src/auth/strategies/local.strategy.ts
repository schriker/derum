import { Injectable } from '@nestjs/common';
import { use } from 'passport';
import { Strategy } from 'passport-local';
import { UsersEmailLoginService } from 'src/users/services/users-email-login.service';

@Injectable()
export class LocalStrategy {
  constructor(private usersEmailLoginService: UsersEmailLoginService) {
    this.init();
  }

  async init() {
    use(
      new Strategy(
        { usernameField: 'email' },
        async (email: string, password: string, done: any) => {
          try {
            const user = await this.usersEmailLoginService.loginWithEmail({
              email,
              password,
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
