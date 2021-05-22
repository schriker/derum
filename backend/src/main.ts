import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import Redis from 'ioredis';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { ConfigService } from '@nestjs/config';

let redisClient: Redis.Redis;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get(ConfigService);
  const RedisStore = connectRedis(session);
  redisClient = new Redis(configService.get('REDIS_PORT'));
  app.enableCors({
    origin: configService.get('ORIGIN'),
    credentials: true,
  });
  app.use(
    session({
      secret: configService.get('SESSION_SECRECT'),
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      cookie: {
        httpOnly: true,
        sameSite: false,
        secure: false, // Change to true on prod
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(4000);
}
bootstrap();

export { redisClient };
