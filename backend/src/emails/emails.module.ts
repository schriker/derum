import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';

@Module({
  exports: [EmailsService],
  providers: [EmailsService],
})
export class EmailsModule {}
