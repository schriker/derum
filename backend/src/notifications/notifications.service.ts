import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Entry } from 'src/entries/entities/entry.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectTypeEnum } from './types/object-type.enum';
import { Comment } from 'src/comments/entities/comment.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
  ) {}

  countNew(user: User): Promise<number> {
    return this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.userId = :userId AND notification.readed = false', {
        userId: user.id,
      })
      .getCount();
  }

  get(offsetId: number, user: User): Promise<Notification[]> {
    const whereQuery =
      offsetId > 0
        ? 'notification.userId = :userId AND notification.id < :offset'
        : 'notification.userId = :userId';

    return this.notificationRepository
      .createQueryBuilder('notification')
      .where(whereQuery, {
        userId: user.id,
        offset: offsetId,
      })
      .leftJoinAndSelect('notification.triggeredBy', 'triggeredBy')
      .addOrderBy('notification.createdAt', 'DESC')
      .take(10)
      .getMany();
  }

  getById(id: number): Promise<Notification> {
    return this.notificationRepository
      .createQueryBuilder('notification')
      .where('notification.id = :id', {
        id,
      })
      .leftJoinAndSelect('notification.user', 'user')
      .leftJoinAndSelect('notification.triggeredBy', 'triggeredBy')
      .getOne();
  }

  async markOneAsReaded(id: number): Promise<Notification> {
    const notification = await this.getById(id);
    notification.readed = true;
    return this.notificationRepository.save(notification);
  }

  async markAllAsReaded(user: User): Promise<boolean> {
    await this.notificationRepository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.user', 'user')
      .update(Notification)
      .where('user.id = :id', {
        id: user.id,
      })
      .set({ readed: true })
      .execute();
    return true;
  }

  async createForNewComment(
    entry: Entry,
    user: User,
    comment: Comment,
  ): Promise<void> {
    if (entry.author.id === user.id) return;
    const notification = new Notification();
    notification.user = entry.author;
    notification.url = `p/${entry.room.name}/wpis/${entry.id}/${entry.slug}`;
    notification.objectType = ObjectTypeEnum.COMMENT;
    notification.objectId = comment.id;
    notification.triggeredBy = user;
    notification.parentId = entry.id;
    const result = await this.notificationRepository.save(notification);

    this.pubSub.publish('notification', {
      notification: result,
    });
  }

  async createForReply(
    entry: Entry,
    comment: Comment,
    user: User,
    reply: Comment,
  ): Promise<void> {
    if (comment.author.id === user.id) return;
    const notification = new Notification();
    notification.user = comment.author;
    notification.url = `p/${entry.room.name}/wpis/${entry.id}/${entry.slug}`;
    notification.objectType = ObjectTypeEnum.REPLY;
    notification.objectId = reply.id;
    notification.triggeredBy = user;
    notification.parentId = comment.id;
    const result = await this.notificationRepository.save(notification);

    this.pubSub.publish('notification', {
      notification: result,
    });
  }
}
