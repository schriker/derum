import { Test, TestingModule } from '@nestjs/testing';
import { BlacklistPublishersResolver } from './blacklist-publishers.resolver';

describe('BlacklistPublishersResolver', () => {
  let resolver: BlacklistPublishersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlacklistPublishersResolver],
    }).compile();

    resolver = module.get<BlacklistPublishersResolver>(BlacklistPublishersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
