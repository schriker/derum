import {
  Directive,
  Field,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Comment } from 'src/comments/entities/comment.entity';
import { Link } from 'src/meta-scraper/entities/link.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { VoteValueEnum } from 'src/votes/types/value.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntryType } from '../types/entry-type.enum';

registerEnumType(EntryType, {
  name: 'EntryType',
});

@Directive('@cacheControl(maxAge: 30, scope: PRIVATE)')
@ObjectType()
@Entity('entry')
export class Entry {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  url: string;

  @Field()
  @Column()
  @Index()
  slug: string;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  publisher: string;

  @Field()
  @Column()
  description: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  body: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.entires)
  author: User;

  @Index()
  @Field(() => Room)
  @ManyToOne(() => Room, (room) => room.entires)
  room: Room;

  @ManyToOne(() => Link, (link) => link.entires, { nullable: true })
  link: Link;

  @Field(() => Photo, { nullable: true })
  @OneToOne(() => Photo, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn()
  photo: Photo;

  @Field(() => EntryType)
  @Column({
    type: 'enum',
    enum: EntryType,
  })
  type: EntryType;

  @OneToMany(() => Vote, (vote) => vote.entry)
  votes: Vote[];

  @Field(() => Comment)
  @OneToMany(() => Comment, (comment) => comment.entry)
  comments: Comment[];

  @Field(() => Int, { nullable: true })
  @Column({ select: false, insert: false, readonly: true, nullable: true })
  commentsNumber: number;

  @Field(() => Int, { nullable: true })
  @Column({ select: false, insert: false, readonly: true, nullable: true })
  voteScore: number;

  @Field(() => VoteValueEnum, { nullable: true })
  @Column({ select: false, insert: false, readonly: true, nullable: true })
  userVote: VoteValueEnum;

  @Field(() => Boolean)
  @Column({ type: Boolean, default: false })
  deleted: boolean;
}
