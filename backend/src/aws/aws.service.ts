import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsService {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
    });
  }

  async upload(
    file: Buffer | string,
    folder: string,
    ContentType = 'image/jpeg',
    name = uuidv4(),
  ): Promise<{
    name: string;
    url: string;
  }> {
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
        Key: `${folder}/${name}`,
        Body: file,
        ContentType: ContentType,
        CacheControl: 'max-age=2592000',
        ACL: 'public-read',
      }),
    );

    return {
      name: name,
      url: `https://${this.configService.get(
        'AWS_PUBLIC_BUCKET_NAME',
      )}.s3.${this.configService.get(
        'AWS_REGION',
      )}.amazonaws.com/${folder}/${name}`,
    };
  }

  delete(key: string) {
    this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
        Key: key,
      }),
    );
  }
}
