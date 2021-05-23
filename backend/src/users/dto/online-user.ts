import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OnlineUser {
  @Field(() => Int)
  userId: number;

  @Field()
  name: string;

  @Field()
  photo: string;
}
