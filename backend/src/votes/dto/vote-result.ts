import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VoteResult {
  @Field(() => Int)
  userValue: number;

  @Field(() => Int)
  voteScore: number;
}
