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
@Entity('user')
export class User {
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
  @Column({ nullable: true })
  @Index({ unique: true })
  displayName: string;

  @Field()
  @Column()
  @Index({ unique: true })
  email: string;

  @Field()
  @Column()
  photo: string;

  @Column()
  authProvider: string;

  @Column()
  authId: string;

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];
}
