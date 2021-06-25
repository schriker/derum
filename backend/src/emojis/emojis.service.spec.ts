import { Test, TestingModule } from '@nestjs/testing';
import { EmojisService } from './emojis.service';

describe('EmojisService', () => {
  let service: EmojisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmojisService],
    }).compile();

    service = module.get<EmojisService>(EmojisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
