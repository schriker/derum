import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BlacklistPublishersService } from './blacklist-publishers.service';
import { BlacklistPublisher } from './entities/blacklist-publisher.entity';

@Resolver(() => Boolean)
export class BlacklistPublishersResolver {
  constructor(
    private blaclistPublishersService: BlacklistPublishersService,
    private caslAbilityFactory: CaslAbilityFactory,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async blacklistPublisher(
    @Args('entryId', { type: () => Int }) entryId: number,
    @CurrentUser() session: User,
  ): Promise<boolean> {
    const user = await this.usersService.getById(session.id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Manage, BlacklistPublisher))
      throw new ForbiddenException();
    return this.blaclistPublishersService.addToBlacklist(entryId);
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async blacklistPublisherAndRemoveEntires(
    @Args('entryId', { type: () => Int }) entryId: number,
    @CurrentUser() session: User,
  ): Promise<boolean> {
    const user = await this.usersService.getById(session.id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Manage, BlacklistPublisher))
      throw new ForbiddenException();
    return this.blaclistPublishersService.addToBlacklistAndRemoveEntires(
      entryId,
    );
  }
}
