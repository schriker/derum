import { BadRequestException, Injectable } from '@nestjs/common';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Photo } from './entities/photo.entity';
import { join } from 'path';
import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { exec } from 'child_process';
import { unlinkSync } from 'fs';
import { AwsService } from 'src/aws/aws.service';
import { FileUpload } from 'graphql-upload';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo) private photosRepository: Repository<Photo>,
    private awsService: AwsService,
  ) {}

  savePhotoFromLinkToFile(url: string, fileName: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      exec(
        `curl -o ${fileName} -L -A 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0' '${url}'`,
        { maxBuffer: 5 * 1024 * 1024 },
        async (error) => {
          if (error) {
            unlinkSync(fileName);
            reject();
          }
          resolve();
        },
      );
    });
  }

  checkMimetype(mimetype: string) {
    const filetypes = /jpeg|jpg|png|gif/;
    if (!filetypes.test(mimetype))
      throw new BadRequestException(ERROR_MESSAGES.WRONG_FILE_TYPE);
  }

  resizePhoto(
    width: number,
    height: number,
    file: Buffer | string,
  ): Promise<Buffer> {
    return sharp(file)
      .resize({
        width: width,
        height: height,
        fit: 'cover',
        position: 'top',
      })
      .jpeg({
        quality: 50,
      })
      .toBuffer();
  }

  async saveRoomPhoto(
    attachment: FileUpload,
    roomId: number,
    user: User,
  ): Promise<Photo> {
    const { mimetype, createReadStream } = attachment;
    this.checkMimetype(mimetype);
    return new Promise((resolve) => {
      const stream = createReadStream();
      const imgData: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => {
        imgData.push(chunk);
      });
      stream.on('end', async () => {
        const resizedPhoto = await this.resizePhoto(
          100,
          100,
          Buffer.concat(imgData),
        );
        const { name, url } = await this.awsService.upload(
          resizedPhoto,
          'room',
        );
        const photo = new Photo();
        photo.name = name;
        photo.url = url;
        photo.user = user;

        resolve(this.photosRepository.save(photo));
      });
    });
  }

  async savePhotoFromLink(url: string, user: User): Promise<Photo> {
    const tmpName = uuidv4();
    const tmpFile = join(process.cwd(), tmpName);
    try {
      await this.savePhotoFromLinkToFile(url, tmpName);
      const metaData = await sharp(tmpFile).metadata();
      if (metaData.width < 100 || metaData.height < 100) {
        unlinkSync(tmpFile);
        return null;
      }
      const resizedPhoto = await this.resizePhoto(500, 300, tmpFile);
      unlinkSync(tmpFile);
      const { name, url: awsUrl } = await this.awsService.upload(
        resizedPhoto,
        `thumbs`,
      );
      const photo = new Photo();
      photo.name = name;
      photo.url = awsUrl;
      photo.user = user;
      return this.photosRepository.save(photo);
    } catch (e) {
      unlinkSync(tmpFile);
      return null;
    }
  }
}
