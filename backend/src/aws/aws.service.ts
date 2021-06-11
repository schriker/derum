import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandOutput,
} from '@aws-sdk/client-s3';

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

  upload(file: Buffer, fileName: string): Promise<PutObjectCommandOutput> {
    return this.s3.send(
      new PutObjectCommand({
        Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
        Key: fileName,
        Body: file,
        ContentType: 'image/jpeg',
        ACL: 'public-read',
      }),
    );
  }
}
