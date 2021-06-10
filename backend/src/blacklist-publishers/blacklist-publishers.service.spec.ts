import { Test, TestingModule } from '@nestjs/testing';
import { BlacklistPublishersService } from './blacklist-publishers.service';

describe('BlacklistPublishersService', () => {
  let service: BlacklistPublishersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlacklistPublishersService],
    }).compile();

    service = module.get<BlacklistPublishersService>(BlacklistPublishersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
