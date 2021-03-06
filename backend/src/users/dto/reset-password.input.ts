import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

@InputType()
export class ResetPasswordData {
  @Field()
  @Transform(({ value }) => value.trim())
  token: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @MinLength(6)
  @Match('password')
  passwordConfirmation: string;
}
