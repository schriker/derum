/* eslint-disable @typescript-eslint/no-var-requires */
import got from 'got';
import { Repository } from 'typeorm';
import { NewLink } from './dto/new-link';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import * as iconv from 'iconv-lite';

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
  require('metascraper-video')(),
  require('metascraper-iframe')(),
]);

@Injectable()
export class MetaScraperService {
  constructor(
    @InjectRepository(Link)
    private linkRepository: Repository<Link>,
  ) {}

  async getMetadata(newLink: NewLink, user: User): Promise<Link> {
    try {
      const {
        body: html,
        url,
        headers,
      } = await got(newLink.url, {
        responseType: 'buffer',
      });
      const ctype = headers['content-type'].split('=').pop();
      const data = ctype
        ? iconv.decode(html, ctype)
        : iconv.decode(html, 'UTF-8');
      const {
        author,
        description,
        image,
        title,
        url: linkUrl,
      } = await metascraper({ html: data, url });
      const isScraped = await this.linkRepository.findOne({ url: linkUrl });
      if (isScraped) return isScraped;
      const link = new Link();
      link.author = author;
      link.description = description;
      link.photo = image;
      link.publisher = linkUrl.match(
        /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/?\n]+)/,
      )[1];
      link.title = title;
      link.url = linkUrl;
      link.user = user;

      return this.linkRepository.save(link);
    } catch (e) {
      console.log(e);
      throw new BadRequestException(ERROR_MESSAGES.LINK_FETCH_ERROR);
    }
  }
}
