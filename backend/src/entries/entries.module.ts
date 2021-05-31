import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesResolver } from './entries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Link } from 'src/meta-scraper/entities/link.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { PhotosModule } from 'src/photos/photos.module';

@Module({
  imports: [TypeOrmModule.forFeature([Entry, Link, Room]), PhotosModule],
  providers: [EntriesService, EntriesResolver],
})
export class EntriesModule {}
