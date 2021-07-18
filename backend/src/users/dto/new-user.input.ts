import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEmail, Length, Matches, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

@InputType()
export class NewUserData {
  @Field()
  @IsEmail()
  @Transform(({ value }) => value.trim())
  email: string;

  @Field()
  @Length(3, 25)
  @Transform(({ value }) => value.trim())
  @Matches(/^[a-zA-Z0-9_]+$/)
  name: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @MinLength(6)
  @Match('password')
  passwordConfirmation: string;
}
