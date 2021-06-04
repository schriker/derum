import { Field, Int, ObjectType } from '@nestjs/graphql';
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

@Entity('vote')
@ObjectType()
@Unique('vote_user_entry', ['user', 'entry'])
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
  @ManyToOne(() => Entry, (entry) => entry.votes)
  entry: Entry;

  @Column()
  @Field(() => Int)
  value: VoteValueEnum;
}
