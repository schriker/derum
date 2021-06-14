import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesResolver } from './entries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Link } from 'src/meta-scraper/entities/link.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { PhotosModule } from 'src/photos/photos.module';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/users.module';
import { BlacklistPublisher } from 'src/blacklist-publishers/entities/blacklist-publisher.entity';
import { DerumGuard } from './guards/derum.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry, Link, Room, BlacklistPublisher]),
    PhotosModule,
    CaslModule,
    UsersModule,
  ],
  exports: [EntriesService],
  providers: [EntriesService, EntriesResolver, DerumGuard],
})
export class EntriesModule {}
