import { Field, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { MinLength } from 'class-validator';

@InputType()
export class NewCommentData {
  @Field()
  @Transform(({ value }) => value.trim())
  @MinLength(2)
  body: string;

  @Field(() => Int)
  entryId: number;

  @Field(() => Int, { nullable: true })
  parentId?: number;
}
