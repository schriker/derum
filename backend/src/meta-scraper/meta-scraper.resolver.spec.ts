import { Test, TestingModule } from '@nestjs/testing';
import { MetaScraperResolver } from './meta-scraper.resolver';

describe('MetaScraperResolver', () => {
  let resolver: MetaScraperResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaScraperResolver],
    }).compile();

    resolver = module.get<MetaScraperResolver>(MetaScraperResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
