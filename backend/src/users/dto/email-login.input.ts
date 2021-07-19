import { ArgsType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';

@ArgsType()
export class EmailLoginData {
  @Field()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}
