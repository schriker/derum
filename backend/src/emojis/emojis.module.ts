import { Module } from '@nestjs/common';
import { EmojisService } from './emojis.service';
import { EmojisResolver } from './emojis.resolver';

@Module({
  providers: [EmojisService, EmojisResolver]
})
export class EmojisModule {}
