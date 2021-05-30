import { Field, ArgsType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Matches } from 'class-validator';

@ArgsType()
export class NewLink {
  @Field()
  @Transform(({ value }) => value.trim())
  @Matches(
    /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/,
  )
  url: string;
}
