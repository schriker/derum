import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
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

  @Field(() => Photo)
  @OneToOne(() => Photo, { nullable: true })
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

  @Field(() => Int, { nullable: true })
  @Column({ select: false, insert: false, readonly: true, nullable: true })
  voteScore: number;

  @Field(() => VoteValueEnum, { nullable: true })
  @Column({ select: false, insert: false, readonly: true, nullable: true })
  userVote: VoteValueEnum;
}
