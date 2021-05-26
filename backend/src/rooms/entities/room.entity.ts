import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @ManyToMany(() => User, (user) => user.joinedRooms)
  @JoinTable()
  users: User[];
}
