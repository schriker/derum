import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class NewSettingsData {
  @Field(() => Boolean, { nullable: true })
  showNotifications?: boolean;

  @Field(() => Boolean, { nullable: true })
  showAvatars?: boolean;

  @Field(() => Boolean, { nullable: true })
  showColorNames?: boolean;
}
