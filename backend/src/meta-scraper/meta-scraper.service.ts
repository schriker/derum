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

  getEncoding(comand: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(comand, { maxBuffer: 5 * 1024 * 1024 }, async (error, stdout) => {
        if (error) reject(error);
        const encoding = stdout.trim().split('=');
        resolve(encoding.length > 1 ? encoding[1] : 'UTF-8');
      });
    });
  }

  getUrlData(comand: string, url): Promise<any> {
    return new Promise(async (resolve, reject) => {
      exec(comand, { maxBuffer: 5 * 1024 * 1024 }, async (error, stdout) => {
        if (error) reject(error);
        resolve(metascraper({ html: stdout, url }));
      });
    });
  }

  async getMetadata(newLink: NewLink, user: User): Promise<Link> {
    try {
      let encoding = await this.getEncoding(
        `curl -I '${newLink.url}' -A "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)" | grep -Fi content-type:`,
      );
      let result = await this.getUrlData(
        encoding === 'UTF-8'
          ? `curl '${newLink.url}' -A "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)"`
          : `curl '${newLink.url}' -A "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)" | iconv -f ${encoding} -t UTF-8`,
        newLink.url,
      );

      if (!result.author && !result.description && !result.image) {
        encoding = await this.getEncoding(
          `curl -I '${newLink.url}' | grep -Fi content-type:`,
        );
        result = await this.getUrlData(
          encoding === 'UTF-8'
            ? `curl '${newLink.url}'`
            : `curl '${newLink.url}' | iconv -f ${encoding} -t UTF-8`,
          newLink.url,
        );
      }
      const { author, description, image, title, url: linkUrl } = result;

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
