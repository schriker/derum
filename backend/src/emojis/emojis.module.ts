import { Module } from '@nestjs/common';
import { EmojisService } from './emojis.service';
import { EmojisResolver } from './emojis.resolver';
import { CaslModule } from 'src/casl/casl.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emoji } from './entities/emoji.entity';
import { UsersModule } from 'src/users/users.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Emoji]),
    CaslModule,
    UsersModule,
    AwsModule,
  ],
  providers: [EmojisService, EmojisResolver],
})
export class EmojisModule {}
