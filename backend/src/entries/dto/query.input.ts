import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class QueryEntriesInput {
  @Field()
  roomName: string;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  offset: number;
}
