import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';

@Module({
  exports: [AwsService],
  providers: [AwsService],
})
export class AwsModule {}
