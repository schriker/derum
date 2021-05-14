import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

@Module({
  providers: [
    {
      provide: 'PUB_SUB',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const options = {
          host: configService.get('REDIS_HOST'),
          port: parseInt(configService.get('REDIS_PORT')),
          retryStrategy: (times: number) => {
            return Math.min(times * 50, 2000);
          },
        };

        return new RedisPubSub({
          publisher: new Redis(options),
          subscriber: new Redis(options),
        });
      },
    },
  ],
  exports: ['PUB_SUB'],
})
export class PubSubModule {}
