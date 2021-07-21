import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entries/entities/entry.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { VoteValueEnum } from '../types/value.enum';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('vote')
@ObjectType()
@Unique('vote_user_entry', ['user', 'entry'])
@Unique('vote_user_entry', ['user', 'comment'])
@Directive('@cacheControl(maxAge: 30, scope: PRIVATE)')
export class Vote {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Index()
  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @Index()
  @ManyToOne(() => User, (user) => user.points)
  pointFor: User;

  @Index()
  @ManyToOne(() => Entry, (entry) => entry.votes, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  entry: Entry;

  @Index()
  @ManyToOne(() => Comment, (comment) => comment.votes, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  comment: Comment;

  @Column()
  @Field(() => Int)
  value: VoteValueEnum;
}
