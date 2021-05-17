import { Module } from '@nestjs/common';
import { EntriesService } from './entries.service';
import { EntriesResolver } from './entries.resolver';

@Module({
  providers: [EntriesService, EntriesResolver]
})
export class EntriesModule {}
