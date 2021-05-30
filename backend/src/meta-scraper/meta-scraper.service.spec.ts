import { Test, TestingModule } from '@nestjs/testing';
import { MetaScraperService } from './meta-scraper.service';

describe('MetaScraperService', () => {
  let service: MetaScraperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaScraperService],
    }).compile();

    service = module.get<MetaScraperService>(MetaScraperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
