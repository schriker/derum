import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

@InputType()
export class NewMessageInput {
  @Field(() => Int)
  roomId: number;

  @Field()
  @Length(1, 500)
  @Transform(({ value }) => value.trim())
  body: string;
}
