import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
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
@Entity('photo')
@Directive('@cacheControl(maxAge: 120)')
export class Photo {
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

  @Column()
  key: string;

  @Field()
  @Column()
  url: string;

  @ManyToOne(() => User, (user) => user.photos)
  user: User;
}
