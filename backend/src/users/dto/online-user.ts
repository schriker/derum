import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Photo } from 'src/photos/entities/photo.entity';

@ObjectType()
export class OnlineUser {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  roomId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  photo: Photo;

  @Field()
  isAdmin: boolean;

  @Field()
  isModerator: boolean;

  @Field()
  isBanned: boolean;

  @Field()
  color: string;

  connectionId: string;
}
