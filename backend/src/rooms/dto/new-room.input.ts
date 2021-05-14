import { InputType, Field } from '@nestjs/graphql';
import { MaxLength, Length } from 'class-validator';

@InputType()
export class NewRoomInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field()
  @Length(15, 255)
  description: string;
}
