import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exec } from 'child_process';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { NewEmojiData } from './dto/new-emoji';
import { Emoji } from './entities/emoji.entity';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';
import { AwsService } from 'src/aws/aws.service';
import { ERROR_MESSAGES } from 'src/consts/error-messages';

@Injectable()
export class EmojisService {
  constructor(
    @InjectRepository(Emoji)
    private emojisRepository: Repository<Emoji>,
    private awsService: AwsService,
  ) {}

  saveEmojiToFile(url: string, fileName: string): Promise<void> {
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

  resizeGifEmoji(height: number, file: Buffer | string): Promise<Buffer> {
    return (
      sharp(file, { animated: true })
        .resize(height)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .gif({
          pageHeight: height,
        })
        .toBuffer()
    );
  }

  resizeEmoji(
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
      .png({
        quality: 80,
      })
      .sharpen()
      .toBuffer();
  }

  getGlobal(): Promise<Emoji[]> {
    return this.emojisRepository.find({ roomId: null });
  }

  async create(data: NewEmojiData): Promise<boolean> {
    const exists = await this.emojisRepository.findOne({ name: data.name });
    if (exists) throw new BadRequestException(ERROR_MESSAGES.EMOJI_EXISTS);
    const tmpName = uuidv4();
    const tmpFile = join(process.cwd(), tmpName);
    try {
      let full: Buffer;
      let medium: Buffer;
      let small: Buffer;
      await this.saveEmojiToFile(data.url, tmpName);
      const metaData = await sharp(tmpFile).metadata();

      if (metaData.format === 'gif') {
        full = await this.resizeGifEmoji(112, tmpFile);
        medium = await this.resizeGifEmoji(56, tmpFile);
        small = await this.resizeGifEmoji(28, tmpFile);
      } else {
        full = await this.resizeEmoji(112, 112, tmpFile);
        medium = await this.resizeEmoji(56, 56, tmpFile);
        small = await this.resizeEmoji(28, 28, tmpFile);
      }
      unlinkSync(tmpFile);

      await this.awsService.upload(
        full,
        `emojis`,
        `image/${metaData.format}`,
        `${tmpName}/4x`,
      );

      await this.awsService.upload(
        medium,
        `emojis`,
        `image/${metaData.format}`,
        `${tmpName}/2x`,
      );

      await this.awsService.upload(
        small,
        `emojis`,
        `image/${metaData.format}`,
        `${tmpName}/1x`,
      );

      const emoji = new Emoji();
      emoji.name = data.name;
      emoji.roomId = data.roomId;
      emoji.file = tmpName;
      await this.emojisRepository.save(emoji);
      return true;
    } catch (e) {
      unlinkSync(tmpFile);
      return e;
    }
  }
}
