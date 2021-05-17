import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity('message')
export class Message {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field()
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  author: User;

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @Field()
  @Column()
  body: string;
}
