import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSession } from './entities/user-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserSession])],
  exports: [UsersService],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
