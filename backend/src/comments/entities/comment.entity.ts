import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entry } from 'src/entries/entities/entry.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
