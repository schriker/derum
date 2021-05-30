import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GQLSessionGuard } from 'src/auth/guards/session-gql-auth.guard';
import { CurrentUser } from 'src/users/decorators/currentUser.decorator';
import { User } from 'src/users/entities/user.entity';
import { NewLink } from './dto/new-link';
import { Link } from './entities/link.entity';
import { MetaScraperService } from './meta-scraper.service';

@Resolver()
export class MetaScraperResolver {
  constructor(private metaScraperService: MetaScraperService) {}

  @Query(() => Link)
  @UseGuards(GQLSessionGuard)
  metadata(@Args() newLink: NewLink, @CurrentUser() user: User): Promise<Link> {
    return this.metaScraperService.getMetadata(newLink, user);
  }
}
