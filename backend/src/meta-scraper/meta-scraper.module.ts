import { Module } from '@nestjs/common';
import { MetaScraperService } from './meta-scraper.service';
import { MetaScraperResolver } from './meta-scraper.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Link]), UsersModule],
  providers: [MetaScraperService, MetaScraperResolver],
})
export class MetaScraperModule {}
