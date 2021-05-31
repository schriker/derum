import { Field, InputType, Int } from '@nestjs/graphql';
import { Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class NewLinkData {
  @Field()
  @Length(3, 150)
  @Transform(({ value }) => value.trim())
  title: string;

  @Field()
  @Transform(({ value }) => value.trim())
  @Matches(
    /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
  )
  photo: string;

  @Field()
  @Length(100, 500)
  @Transform(({ value }) => value.trim())
  description: string;

  @Field(() => Int)
  linkId: number;

  @Field(() => Int)
  roomId: number;
}
