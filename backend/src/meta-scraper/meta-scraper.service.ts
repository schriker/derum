/* eslint-disable @typescript-eslint/no-var-requires */
import got from 'got';
import { Repository } from 'typeorm';
import { NewLink } from './dto/new-link';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Scraper } from 'metascraper';

const metascraper: Scraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
]);

@Injectable()
export class MetaScraperService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async getMetadata(newLink: NewLink, user: User): Promise<Link> {
    try {
      const { body: html, url } = await got(newLink.url);
      const isScraped = await this.linkRepository.findOne({ url: url });
      if (isScraped) return isScraped;
      const {
        author,
        description,
        image,
        publisher,
        title,
        url: linkUrl,
      } = await metascraper({ html, url });
      const link = new Link();
      link.author = author;
      link.description = description;
      link.photo = image;
      link.publisher = publisher;
      link.title = title;
      link.url = linkUrl;
      link.user = user;

      return this.linkRepository.save(link);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
