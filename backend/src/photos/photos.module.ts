import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from 'src/aws/aws.module';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';
import { PhotosResolver } from './photos.resolver';
import { CaslModule } from 'src/casl/casl.module';
import { UsersModule } from 'src/users/users.module';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    AwsModule,
    CaslModule,
    UsersModule,
    RoomsModule,
  ],
  providers: [PhotosService, PhotosResolver],
  exports: [PhotosService],
})
export class PhotosModule {}
