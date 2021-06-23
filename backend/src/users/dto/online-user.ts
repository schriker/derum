import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OnlineUser {
  @Field(() => Int)
  userId: number;

  @Field(() => Int)
  roomId: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  photo: string;

  @Field()
  isAdmin: boolean;

  @Field()
  isModerator: boolean;

  @Field()
  isBanned: boolean;

  connectionId: string;
}
