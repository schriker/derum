import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Length } from 'class-validator';

@ArgsType()
export class NewDisplayName {
  @Field()
  @Length(3, 255)
  @Transform(({ value }) => value.trim())
  displayName: string;
}
