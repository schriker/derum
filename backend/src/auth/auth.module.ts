import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { CookieSerializer } from './cookie.serializer';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [
    FacebookStrategy,
    LocalStrategy,
    GoogleStrategy,
    CookieSerializer,
  ],
})
export class AuthModule {}
