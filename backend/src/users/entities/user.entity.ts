import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Link } from 'src/meta-scraper/entities/link.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserSession } from './user-session.entity';

@Directive('@cacheControl(maxAge: 120)')
@ObjectType()
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Field()
  @Column({ nullable: true })
  @Index({ unique: true })
  displayName: string;

  @Field()
  @Column()
  @Index({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  emailVerificationToken: string;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Field(() => Boolean)
  @Column({ default: false })
  verified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  photo: string;

  @Column()
  authProvider: string;

  @Column()
  authId: string;

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @OneToMany(() => Room, (room) => room.author)
  createdRooms: Room[];

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @OneToMany(() => Entry, (entry) => entry.author)
  entries: Entry[];

  @Field(() => Int)
  entriesNumber: number;

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @Field(() => Boolean)
  @Column({ default: false })
  isAdmin: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  isModerator: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  isBanned: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  showNotifications: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  showAvatars: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  showColorNames: boolean;

  @Field()
  @Column({ default: '#42E766' })
  color: string;

  @Directive('@cacheControl(maxAge: 0)')
  @Field(() => [Room])
  @ManyToMany(() => Room, (room) => room.users)
  joinedRooms: Room[];

  @Directive('@cacheControl(maxAge: 0)')
  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  ignore: User[];

  @Field(() => [Notification])
  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @Field(() => Int)
  @OneToMany(() => Vote, (vote) => vote.pointFor)
  points: Vote[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  @Field(() => Int)
  commentsNumber: number;

  @OneToMany(() => UserSession, (session) => session.user)
  sessions: UserSession[];
}
