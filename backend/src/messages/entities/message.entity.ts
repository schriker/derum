import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/rooms/entities/room.entity';
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

  @ManyToOne(() => Room, (room) => room.messages)
  room: Room;

  @Field()
  @Column()
  body: string;
}
