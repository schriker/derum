import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Photo } from './entities/photo.entity';
import { join } from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { exec } from 'child_process';
import { unlinkSync } from 'fs';
import { AwsService } from 'src/aws/aws.service';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photosRepository: Repository<Photo>,
    private configService: ConfigService,
    private awsService: AwsService,
  ) {}

  getPhotoData(url: string, fileName: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      exec(`curl -o ${fileName} '${url}'`, async (error) => {
        if (error) reject(error);
        resolve();
      });
    });
  }

  async savePhotoFromLink(url: string, user: User): Promise<Photo> {
    try {
      const name = uuidv4();
      const tempFile = join(process.cwd(), name);
      await this.getPhotoData(url, name);
      const metaData = await sharp(tempFile).metadata();
      if (metaData.width < 100 || metaData.height < 100)
        throw new BadRequestException(ERROR_MESSAGES.PHOTO_FETCHING_ERROR);
      const resizedPhoto = await sharp(tempFile)
        .resize({
          width: 500,
          height: 300,
          fit: 'cover',
          position: 'top',
        })
        .jpeg({
          quality: 50,
        })
        .toBuffer();
      unlinkSync(tempFile);
      await this.awsService.upload(resizedPhoto, `thumbs/${name}`);
      const photo = new Photo();
      photo.name = name;
      photo.url = `https://${this.configService.get(
        'AWS_PUBLIC_BUCKET_NAME',
      )}.s3.${this.configService.get(
        'AWS_PUBLIC_BUCKET_REGION',
      )}.amazonaws.com/thumbs/${name}`;
      photo.user = user;
      return this.photosRepository.save(photo);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(
        ERROR_MESSAGES.PHOTO_FETCHING_ERROR,
      );
    }
  }
}
