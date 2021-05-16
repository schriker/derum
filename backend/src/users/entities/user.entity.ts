import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
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
}
