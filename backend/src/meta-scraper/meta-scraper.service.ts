/* eslint-disable @typescript-eslint/no-var-requires */
import { Repository } from 'typeorm';
import { NewLink } from './dto/new-link';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Link } from './entities/link.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { ERROR_MESSAGES } from 'src/consts/error-messages';
import { exec } from 'child_process';

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

  getEncoding(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(
        `curl -I '${url}' -A 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0' | grep -Fi content-type:`,
        { maxBuffer: 5 * 1024 * 1024 },
        async (error, stdout) => {
          if (error) reject(error);
          const encoding = stdout.trim().split('=');
          resolve(encoding.length > 1 ? encoding[1] : 'UTF-8');
        },
      );
    });
  }

  getUrlData(url: string, encoding: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      exec(
        `curl '${url}' -A 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:89.0) Gecko/20100101 Firefox/89.0' | iconv -f ${encoding} -t UTF-8`,
        { maxBuffer: 5 * 1024 * 1024 },
        async (error, stdout) => {
          if (error) reject(error);
          resolve(metascraper({ html: stdout, url }));
        },
      );
    });
  }

  async getMetadata(newLink: NewLink, user: User): Promise<Link> {
    try {
      const encoding = await this.getEncoding(newLink.url);
      const {
        author,
        description,
        image,
        title,
        url: linkUrl,
      } = await this.getUrlData(newLink.url, encoding);

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
