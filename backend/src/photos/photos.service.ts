import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import got from 'got';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Photo } from './entities/photo.entity';
import { join } from 'path';
import * as sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photosRepository: Repository<Photo>,
    private configService: ConfigService,
  ) {}

  async savePhotoFromLink(url: string, user: User): Promise<Photo> {
    try {
      const name = uuidv4();
      const photoData = await got(url).buffer();
      const metaData = await sharp(photoData).metadata();
      if (metaData.width < 100 || metaData.height < 100)
        throw new BadRequestException(ERROR_MESSAGES.PHOTO_FETCHING_ERROR);
      await mkdirp(join(__dirname, '..', '..', '..', 'uploads', name));
      await sharp(photoData)
        .resize({
          width: 650,
          height: 350,
          fit: 'cover',
          position: 'top',
        })
        .png()
        .toFile(
          join(__dirname, '..', '..', '..', 'uploads', name, `${name}.png`),
        );
      const photo = new Photo();
      photo.name = `${name}.png`;
      photo.url = `${this.configService.get('HOST')}/${name}/${name}.png`;
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
