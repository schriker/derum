import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class NewArticleData {
  @Field()
  @Length(10, 150)
  @Transform(({ value }) => value.trim())
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : null))
  @Matches(
    /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
  )
  photo?: string;

  @Field()
  @Length(50, 350)
  @Transform(({ value }) => value.trim())
  description: string;

  @Field()
  @Transform(({ value }) => value.trim())
  body: string;

  @Field(() => Int)
  roomId: number;
}
