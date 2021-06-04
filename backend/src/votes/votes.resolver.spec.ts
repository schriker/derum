import { Test, TestingModule } from '@nestjs/testing';
import { VotesResolver } from './votes.resolver';

describe('VotesResolver', () => {
  let resolver: VotesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotesResolver],
    }).compile();

    resolver = module.get<VotesResolver>(VotesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
