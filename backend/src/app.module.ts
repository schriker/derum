import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import * as depthLimit from 'graphql-depth-limit';
import { join } from 'path';
import { RoomsModule } from './rooms/rooms.module';
import { MessagesModule } from './messages/messages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EntriesService } from './entries/entries.service';
import { EntriesModule } from './entries/entries.module';
import { CaslModule } from './casl/casl.module';
import { DateScalar } from './scalars/date.scalar';
import * as cookie from 'cookie';
import { redisClient } from './main';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      playground: {
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
        keepAlive: 5000,
        onConnect: async (connectionParams, webSocket, context) => {
          const cookies = cookie.parse(context.request.headers.cookie);
          const [redisKey] = cookies['connect.sid']
            .split('s:')
            .pop()
            .split('.');
          const session = JSON.parse(await redisClient.get(`sess:${redisKey}`));
          return {
            session,
          };
        },
        // onDisconnect: (ws, ctx) => {
        //   console.log('DISCONECT');
        // },
      },
      cors: {
        credentials: true,
        origin: true,
      },
      uploads: false,
      validationRules: [depthLimit(3)],
      installSubscriptionHandlers: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    RoomsModule,
    MessagesModule,
    UsersModule,
    AuthModule,
    EntriesModule,
    CaslModule,
  ],
  providers: [EntriesService, DateScalar],
})
export class AppModule {}
