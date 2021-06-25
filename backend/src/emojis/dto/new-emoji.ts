import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewEmojiData {
  @Field()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  name: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  url: string;

  @Field(() => Int, { nullable: true })
  roomId?: number;
}
