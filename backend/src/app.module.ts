import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import * as depthLimit from 'graphql-depth-limit';
import { join } from 'path';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EntriesModule } from './entries/entries.module';
import { CaslModule } from './casl/casl.module';
import { DateScalar } from './scalars/date.scalar';
import * as cookie from 'cookie';
import { redisClient } from './main';
import { UsersService } from './users/users.service';
import { MetaScraperModule } from './meta-scraper/meta-scraper.module';
import { PhotosModule } from './photos/photos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { VotesModule } from './votes/votes.module';
import { BlacklistPublishersModule } from './blacklist-publishers/blacklist-publishers.module';
import { AwsModule } from './aws/aws.module';
import { BaseRedisCache } from 'apollo-server-cache-redis';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const responseCachePlugin = require('apollo-server-plugin-response-cache');
import Redis from 'ioredis';
import { graphqlUploadExpress } from 'graphql-upload';

const parseUserSession = async (headerCookie) => {
  const cookies = cookie.parse(headerCookie);
  if (cookies['connect.sid']) {
    const [redisKey] = cookies['connect.sid'].split('s:').pop().split('.');
    const session = JSON.parse(await redisClient.get(`sess:${redisKey}`));
    return session;
  }
  return undefined;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      exclude: ['/graphql*'],
    }),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRootAsync({
      imports: [UsersModule],
      inject: [UsersService, ConfigService],
      useFactory: async (
        usersService: UsersService,
        configService: ConfigService,
      ) => ({
        playground:
          process.env.NODE_ENV === 'production'
            ? false
            : {
                settings: {
                  'request.credentials': 'include',
                },
              },
        context: async ({ req, connection }) => {
          if (connection) {
            return { req: connection.context };
          }
          return { req };
        },
        subscriptions: {
          keepAlive: 10000,
          onConnect: async (connectionParams, webSocket, context) => {
            const session = await parseUserSession(
              context.request.headers.cookie,
            );
            if (session) {
              return {
                session,
                cId: context.request.headers['sec-websocket-key'],
              };
            }
          },
          onDisconnect: async (webSocket, context) => {
            usersService.removeOnlineUser(
              context.request.headers['sec-websocket-key'],
            );
          },
        },
        cors: {
          credentials: true,
          origin: true,
        },
        plugins: [
          responseCachePlugin({
            sessionId: (requestContext) => {
              if (requestContext.context.req.headers.cookie) {
                const cookies = cookie.parse(
                  requestContext.context.req.headers.cookie,
                );
                if (cookies['connect.sid']) {
                  return cookies['connect.sid'];
                }
              }
              return 'not_loged_user';
            },
          }),
        ],
        cache: new BaseRedisCache({
          client: new Redis(configService.get('REDIS_PORT')),
        }),
        uploads: false,
        validationRules: [depthLimit(3)],
        installSubscriptionHandlers: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      }),
    }),
    RoomsModule,
    MessagesModule,
    UsersModule,
    AuthModule,
    EntriesModule,
    CaslModule,
    MetaScraperModule,
    PhotosModule,
    VotesModule,
    BlacklistPublishersModule,
    AwsModule,
  ],
  providers: [DateScalar],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        graphqlUploadExpress({
          maxFileSize: 5000000,
          maxFiles: 1,
        }),
      )
      .forRoutes('graphql');
  }
}
