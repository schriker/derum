import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

@InputType()
export class NewUserData {
  @Field()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @MinLength(6)
  @Match('password')
  passwordConfirmation: string;
}
