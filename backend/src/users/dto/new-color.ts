import { ArgsType, Field } from '@nestjs/graphql';
import { IsIn } from 'class-validator';

export const USER_COLORS = [
  '#DD1C1C',
  '#E76F01',
  '#F4E12F',
  '#42E766',
  '#1FE7DB',
  '#AC1CB9',
  '#DC108B',
];

@ArgsType()
export class NewUserColor {
  @Field()
  @IsIn(USER_COLORS)
  color: string;
}
