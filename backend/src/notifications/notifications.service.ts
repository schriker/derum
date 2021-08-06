import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Entry } from 'src/entries/entities/entry.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ObjectTypeEnum } from './types/object-type.enum';
import { Comment } from 'src/comments/entities/comment.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    @Inject('PUB_SUB')
    private pubSub: RedisPubSub,
    private usersService: UsersService,
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
      .leftJoinAndSelect('triggeredBy.photo', 'photo')
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
    this.pushNotificationForEntry(
      entry.author,
      user,
      ObjectTypeEnum.COMMENT,
      entry,
      entry.id,
      comment.id,
    );
  }

  async createForReply(
    entry: Entry,
    comment: Comment,
    user: User,
    reply: Comment,
  ): Promise<void> {
    this.pushNotificationForEntry(
      comment.author,
      user,
      ObjectTypeEnum.REPLY,
      entry,
      comment.id,
      reply.id,
    );
  }

  async pushNotificationForEntry(
    user: User,
    triggeredBy: User,
    type: ObjectTypeEnum,
    entry: Entry,
    parentId: number,
    commentId: number,
  ) {
    if (!user) return;
    if (user.id === triggeredBy.id) return;
    const isIgnored = await this.usersService.checkIfIgnored(user, triggeredBy);
    if (isIgnored) return;
    const notification = new Notification();
    notification.user = user;
    notification.url = `p/${entry.room.name}/w/${entry.id}/${entry.slug}?comment=${commentId}`;
    notification.objectType = type;
    notification.objectId = commentId;
    notification.triggeredBy = triggeredBy;
    notification.parentId = parentId;
    const result = await this.notificationRepository.save(notification);

    this.pubSub.publish('notification', {
      notification: result,
    });
  }
}
