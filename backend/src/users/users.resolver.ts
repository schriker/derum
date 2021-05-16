import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { NewFacebookUserInput } from './dto/new-facebook-user.input';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  @Mutation(() => Boolean)
  createUserWithFacebook(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args('newUserData') newUserData: NewFacebookUserInput,
  ): boolean {
    return true;
  }

  @Mutation(() => Boolean)
  loginUserWithFacebook(): boolean {
    return true;
  }
}
