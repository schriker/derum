import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

@InputType()
export class NewFacebookUserInput {
  @Field()
  @Length(3, 255)
  @Transform(({ value }) => value.trim())
  displayName: string;

  @Field()
  accessToken: string;
}
