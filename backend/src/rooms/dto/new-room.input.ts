import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

@InputType()
export class NewRoomInput {
  @Field()
  @Length(3, 255)
  @Transform(({ value }) => value.trim())
  name: string;

  @Field()
  @Length(10, 255)
  @Transform(({ value }) => value.trim())
  description: string;
}
