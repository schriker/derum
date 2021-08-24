import { Field, InputType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { Match } from 'src/common/decorators/match.decorator';

@InputType()
export class NewPasswordData {
  @Field()
  @MinLength(6)
  password: string;

  @Field()
  @MinLength(6)
  newPassword: string;

  @Field()
  @MinLength(6)
  @Match('newPassword')
  newPasswordConfirmation: string;
}
