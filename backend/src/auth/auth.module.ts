import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { CookieSerializer } from './cookie.serializer';
import { FacebookStrategy } from './strategies/facebook.strategy';

@Module({
  imports: [UsersModule, PassportModule.register({ session: true })],
  providers: [FacebookStrategy, CookieSerializer],
})
export class AuthModule {}
