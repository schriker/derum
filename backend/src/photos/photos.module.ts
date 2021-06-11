import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsModule } from 'src/aws/aws.module';
import { Photo } from './entities/photo.entity';
import { PhotosService } from './photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), AwsModule],
  providers: [PhotosService],
  exports: [PhotosService],
})
export class PhotosModule {}
