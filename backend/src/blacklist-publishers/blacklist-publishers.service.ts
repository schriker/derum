import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { Entry } from 'src/entries/entities/entry.entity';
import { Repository } from 'typeorm';
import { BlacklistPublisher } from './entities/blacklist-publisher.entity';

@Injectable()
export class BlacklistPublishersService {
  constructor(
    @InjectRepository(Entry)
    private entryRepository: Repository<Entry>,
    @InjectRepository(BlacklistPublisher)
    private blacklistPublisherRepository: Repository<BlacklistPublisher>,
  ) {}

  async addToBlacklist(entryId: number): Promise<boolean> {
    const entry = await this.entryRepository.findOne(entryId);
    if (!entry || !entry.publisher)
      throw new NotFoundException(ERROR_MESSAGES.ENTRY_NOT_FOUND);
    const blacklistPublisherExists =
      await this.blacklistPublisherRepository.findOne({
        name: entry.publisher,
      });
    if (blacklistPublisherExists) return true;
    const blacklistPublisher = new BlacklistPublisher();
    blacklistPublisher.name = entry.publisher;
    await this.blacklistPublisherRepository.save(blacklistPublisher);
    return true;
  }

  async addToBlacklistAndRemoveEntires(entryId: number): Promise<boolean> {
    await this.addToBlacklist(entryId);
    const entry = await this.entryRepository.findOne(entryId);
    await this.entryRepository
      .createQueryBuilder('entry')
      .update(Entry)
      .where('entry.publisher ILIKE :publisher', {
        publisher: `%${entry.publisher}%`,
      })
      .set({ deleted: true })
      .execute();
    return true;
  }
}
