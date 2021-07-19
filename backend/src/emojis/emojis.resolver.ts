import { ForbiddenException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Action } from 'src/casl/action.enum';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { GQLSessionGuard } from 'src/common/guards/gql-session-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';
import { NewEmojiData } from './dto/new-emoji';
import { EmojisService } from './emojis.service';
import { Emoji } from './entities/emoji.entity';

@Resolver(() => Emoji)
export class EmojisResolver {
  constructor(
    private caslAbilityFactory: CaslAbilityFactory,
    private emojisService: EmojisService,
    private usersService: UsersService,
  ) {}

  @Query(() => [Emoji])
  globalEmojis(): Promise<Emoji[]> {
    return this.emojisService.getGlobal();
  }

  @Mutation(() => Boolean)
  @UseGuards(GQLSessionGuard)
  async createEmoji(
    @CurrentUser() session: User,
    @Args('newEmojiData') newEmojiData: NewEmojiData,
  ): Promise<boolean> {
    const user = await this.usersService.getByIdBasic(session.id);
    const ability = this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.Create, Emoji)) throw new ForbiddenException();

    return this.emojisService.create(newEmojiData);
  }
}
