import { Test, TestingModule } from '@nestjs/testing';
import { EmojisResolver } from './emojis.resolver';

describe('EmojisResolver', () => {
  let resolver: EmojisResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmojisResolver],
    }).compile();

    resolver = module.get<EmojisResolver>(EmojisResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
