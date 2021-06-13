import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AwsService {
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_PUBLIC_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>(
          'AWS_PUBLIC_BUCKET_ACCESS_KEY',
        ),
        secretAccessKey: this.configService.get<string>(
          'AWS_PUBLIC_BUCKET_SECRET_KEY',
        ),
      },
    });
  }

  async upload(
    file: Buffer,
    folder: string,
  ): Promise<{
    name: string;
    url: string;
  }> {
    const name = uuidv4();

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
        Key: `${folder}/${name}`,
        Body: file,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
      }),
    );

    return {
      name: name,
      url: `https://${this.configService.get(
        'AWS_PUBLIC_BUCKET_NAME',
      )}.s3.${this.configService.get(
        'AWS_PUBLIC_BUCKET_REGION',
      )}.amazonaws.com/${folder}/${name}`,
    };
  }
}
