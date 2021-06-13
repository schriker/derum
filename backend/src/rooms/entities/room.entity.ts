import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entries/entities/entry.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Photo } from 'src/photos/entities/photo.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Directive('@cacheControl(maxAge: 240)')
@ObjectType()
@Entity('room')
export class Room {
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
  @Column()
  @Index({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.createdRooms)
  author: User;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @OneToMany(() => Entry, (entry) => entry.room)
  entires: Entry[];

  @ManyToMany(() => User, (user) => user.joinedRooms)
  @JoinTable()
  users: User[];

  @Field(() => Int)
  usersNumber: number;

  @Field(() => Photo, { nullable: true })
  @OneToOne(() => Photo, { nullable: true })
  @JoinColumn()
  photo: Photo;
}
