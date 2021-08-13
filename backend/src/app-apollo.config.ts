// eslint-disable-next-line @typescript-eslint/no-var-requires
const responseCachePlugin = require('apollo-server-plugin-response-cache');
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/services/users.service';
import * as cookie from 'cookie';
import { redisClient } from './main';
import * as depthLimit from 'graphql-depth-limit';
import { join } from 'path';
import { BaseRedisCache } from 'apollo-server-cache-redis';

const parseUserSession = async (headerCookie) => {
  const cookies = cookie.parse(headerCookie);
  if (cookies['connect.sid']) {
    const [redisKey] = cookies['connect.sid'].split('s:').pop().split('.');
    const session = JSON.parse(await redisClient.get(`sess:${redisKey}`));
    return session;
  }
  return undefined;
};

const apolloConfig = {
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
    context: async ({ req, connection, ...rest }) => {
      if (connection) {
        return { req: connection.context, ...rest };
      }
      return { req, ...rest };
    },
    subscriptions: {
      keepAlive: 10000,
      onConnect: async (connectionParams, webSocket, context) => {
        if (context.request.headers.cookie) {
          const session = await parseUserSession(
            context.request.headers.cookie,
          );
          if (session) {
            return {
              session,
              cId: context.request.headers['sec-websocket-key'],
              ...context,
            };
          }
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
    validationRules: [depthLimit(4)],
    installSubscriptionHandlers: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }),
};

export default apolloConfig;
