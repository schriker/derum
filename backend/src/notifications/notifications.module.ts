import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsResolver } from './notifications.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from 'src/notifications/entities/notification.entity';
import { UsersModule } from 'src/users/users.module';
import { PubSubModule } from 'src/pub-sub/pub-sub.module';
import { CaslModule } from 'src/casl/casl.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    UsersModule,
    PubSubModule,
    CaslModule,
  ],
  exports: [NotificationsService],
  providers: [NotificationsService, NotificationsResolver],
})
export class NotificationsModule {}
