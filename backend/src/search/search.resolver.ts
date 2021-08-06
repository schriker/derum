import { Args, Query, Resolver } from '@nestjs/graphql';
import { SearchResult } from './dto/search-result';
import { SearchService } from './search.service';

@Resolver(() => SearchResult)
export class SearchResolver {
  constructor(private searchService: SearchService) {}

  @Query(() => SearchResult)
  search(@Args('query') query: string): Promise<SearchResult> {
    return this.searchService.search(query);
  }
}
