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
  ],
  providers: [EntriesService],
})
export class AppModule {}
