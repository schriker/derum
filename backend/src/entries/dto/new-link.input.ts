import { Field, InputType, Int } from '@nestjs/graphql';
import { Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class NewLinkData {
  @Field()
  @Length(10, 150)
  @Transform(({ value }) => value.trim())
  title: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @Matches(
    /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
  )
  photo: string;

  @Field()
  @Length(50, 350)
  @Transform(({ value }) => value.trim())
  description: string;

  @Field(() => Int)
  linkId: number;

  @Field(() => Int)
  roomId: number;
}
