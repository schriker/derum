import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as aws from '@aws-sdk/client-ses';
import * as nodemailer from 'nodemailer';
import * as Email from 'email-templates';
import { join } from 'path';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EmailsService {
  private ses: aws.SESClient;
  private email: Email;

  constructor(private configService: ConfigService) {
    this.ses = new aws.SESClient({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY'),
      },
    });
    const transporter = nodemailer.createTransport({
      SES: {
        ses: this.ses,
        aws: aws,
      },
    });
    this.email = new Email({
      message: {
        from: 'derum@derum.pl',
      },
      send: true,
      preview: false,
      transport: transporter,
      getPath: (type, template) => join(__dirname, 'templates', template, type),
    });
  }

  sendVerification(user: User) {
    this.email
      .send({
        template: 'verification',
        message: {
          to: user.email,
        },
        locals: {
          name: user.displayName,
          link: `${this.configService.get<string>('ORIGIN')}/verify-email/${
            user.emailVerificationToken
          }`,
        },
      })
      .catch(console.error);
  }

  sendPasswordReset(user: User) {
    this.email
      .send({
        template: 'reset-password',
        message: {
          to: user.email,
        },
        locals: {
          name: user.displayName,
          link: `${this.configService.get<string>('ORIGIN')}/reset-password/${
            user.passwordResetToken
          }`,
        },
      })
      .catch(console.error);
  }
}
