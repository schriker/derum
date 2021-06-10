import { Module } from '@nestjs/common';
import { BlacklistPublishersService } from './blacklist-publishers.service';
import { BlacklistPublishersResolver } from './blacklist-publishers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlacklistPublisher } from './entities/blacklist-publisher.entity';
import { Entry } from 'src/entries/entities/entry.entity';
import { UsersModule } from 'src/users/users.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlacklistPublisher, Entry]),
    UsersModule,
    CaslModule,
  ],
  providers: [BlacklistPublishersService, BlacklistPublishersResolver],
})
export class BlacklistPublishersModule {}
