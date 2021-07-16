import { Field, InputType, Int } from '@nestjs/graphql';
import { Length, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class NewArticleData {
  @Field()
  @Length(10, 150)
  @Transform(({ value }) => value.trim())
  title: string;

  @Field()
  @Length(10, 350)
  @Transform(({ value }) => value.trim())
  description: string;

  @Field()
  @MinLength(10)
  @Transform(({ value }) => value.trim())
  body: string;

  @Field(() => Int)
  roomId: number;
}
