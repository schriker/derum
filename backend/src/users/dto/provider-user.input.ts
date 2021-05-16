import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ProviderUserInput {
  @Field()
  access_token: string;
}
