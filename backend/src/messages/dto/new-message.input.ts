import { Field, InputType, Int } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewMessageInput {
  @Field(() => Int)
  roomId: number;

  @Field()
  @MaxLength(255)
  body: string;
}
