import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entries/entities/entry.entity';
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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Directive('@cacheControl(maxAge: 30, scope: PRIVATE)')
@Entity('comment')
@ObjectType()
export class Comment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @Index()
  @ManyToOne(() => Entry, (entry) => entry.comments)
  entry: Entry;

  @Field()
  @Column()
  body: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => Comment, (comment) => comment.id, { nullable: true })
  @JoinColumn()
  parent: Comment;

  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  @Field(() => Int, { nullable: true })
  @Column({ select: false, insert: false, readonly: true, nullable: true })
  voteScore: number;

  @Field(() => VoteValueEnum, { nullable: true })
  @Column({ select: false, insert: false, readonly: true, nullable: true })
  userVote: VoteValueEnum;
}
