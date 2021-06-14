import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Link } from 'src/meta-scraper/entities/link.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Comment } from 'src/comments/entities/comment.entity';
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
  entires: Entry[];

  @OneToMany(() => Photo, (photo) => photo.user)
  photos: Photo[];

  @Field(() => Boolean)
  @Column({ default: false })
  isAdmin: boolean;

  @Field(() => Boolean)
  @Column({ default: false })
  isModerator: boolean;

  @Directive('@cacheControl(maxAge: 0)')
  @Field(() => [Room])
  @ManyToMany(() => Room, (room) => room.users)
  joinedRooms: Room[];

  @Directive('@cacheControl(maxAge: 0)')
  @Field(() => [User])
  @ManyToMany(() => User)
  @JoinTable()
  ignore: User[];

  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
