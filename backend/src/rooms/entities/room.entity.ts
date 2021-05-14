import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
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
  createdAt: string;

  @Field()
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @Field()
  @Column()
  @Index({ unique: true })
  name: string;

  @Field()
  @Column()
  description: string;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];
}
