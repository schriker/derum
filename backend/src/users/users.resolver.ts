import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { FacebookAuthGuard } from 'src/auth/guards/facebook-auth.guard';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { CurrentUser } from './decorators/currentUser.decorator';
import { ProviderUserInput } from './dto/provider-user.input';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  @Query(() => User)
  @UseGuards(GQLSessionGuard)
  me(@CurrentUser() user: User): User {
    return user;
  }

  @Mutation(() => Boolean)
  @UseGuards(FacebookAuthGuard)
  loginUserWithFacebook(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Args() UserData: ProviderUserInput,
  ): boolean {
    return true;
  }

  @Mutation(() => Boolean)
  logout(@Context() ctx) {
    ctx.req.logout();
    return true;
  }
}
