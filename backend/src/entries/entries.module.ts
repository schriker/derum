import { Module } from '@nestjs/common';
import { EntriesService } from './services/entries.service';
import { EntriesResolver } from './entries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { Link } from 'src/meta-scraper/entities/link.entity';
import { PhotosModule } from 'src/photos/photos.module';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/users.module';
import { BlacklistPublisher } from 'src/blacklist-publishers/entities/blacklist-publisher.entity';
import { DerumGuard } from '../common/guards/derum.guard';
import { EntriesQueryService } from './services/entries-query.service';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Entry, Link, BlacklistPublisher]),
    RoomsModule,
    PhotosModule,
    CaslModule,
    UsersModule,
  ],
  exports: [EntriesService, EntriesQueryService],
  providers: [EntriesService, EntriesQueryService, EntriesResolver, DerumGuard],
})
export class EntriesModule {}
