import { Field, InputType, Int } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class NewLinkData {
  @Field()
  @Length(10, 150)
  @Transform(({ value }) => value.trim())
  title: string;

  @Field()
  @Length(10, 350)
  @Transform(({ value }) => value.trim())
  description: string;

  @Field(() => Int)
  linkId: number;

  @Field(() => Int)
  roomId: number;
}
