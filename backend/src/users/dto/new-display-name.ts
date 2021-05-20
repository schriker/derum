import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Length, Matches } from 'class-validator';

@ArgsType()
export class NewDisplayNameData {
  @Field()
  @Length(3, 25)
  @Transform(({ value }) => value.trim())
  @Matches(/^[a-zA-Z0-9_]+$/)
  name: string;
}
