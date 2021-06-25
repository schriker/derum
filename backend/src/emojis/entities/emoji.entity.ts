import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Directive('@cacheControl(maxAge: 120)')
@Entity('emoji')
@ObjectType()
export class Emoji {
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
  name: string;

  @Field()
  @Column()
  file: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  roomId: number;

  @ManyToOne(() => Room, (comment) => comment.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  room: Room;
}
