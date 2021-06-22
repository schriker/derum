import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Room } from './entities/room.entity';
import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), UsersModule],
  exports: [RoomsService],
  providers: [RoomsResolver, RoomsService],
})
export class RoomsModule {}
