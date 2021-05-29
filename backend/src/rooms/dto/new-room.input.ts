import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Length, Matches } from 'class-validator';

@InputType()
export class NewRoomInput {
  @Field()
  @Length(3, 35)
  @Transform(({ value }) => value.trim())
  @Matches(/^[a-zA-Z0-9_]+$/)
  name: string;

  @Field()
  @Length(10, 255)
  @Transform(({ value }) => value.trim())
  description: string;
}
