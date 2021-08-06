import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectTypeEnum } from '../types/object-type.enum';

registerEnumType(ObjectTypeEnum, {
  name: 'ObjectTypeEnum',
});

@ObjectType()
@Entity('notification')
export class Notification {
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
  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  user: User;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  triggeredBy: User;

  @Field()
  @Column()
  url: string;

  @Field(() => Int)
  @Column()
  objectId: number;

  @Field(() => Int)
  @Column()
  parentId: number;

  @Field(() => ObjectTypeEnum)
  @Column({
    type: 'enum',
    enum: ObjectTypeEnum,
  })
  objectType: ObjectTypeEnum;

  @Field(() => Boolean)
  @Column({ default: false })
  readed: boolean;

  @Column({ default: false })
  deleted: boolean;
}
