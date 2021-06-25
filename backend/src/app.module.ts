import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { graphqlUploadExpress } from 'graphql-upload';
import apolloConfig from './app-apollo.config';
import { AuthModule } from './auth/auth.module';
import { AwsModule } from './aws/aws.module';
import { BlacklistPublishersModule } from './blacklist-publishers/blacklist-publishers.module';
import { CaslModule } from './casl/casl.module';
import { CommentsModule } from './comments/comments.module';
import { EntriesModule } from './entries/entries.module';
import { MessagesModule } from './messages/messages.module';
import { MetaScraperModule } from './meta-scraper/meta-scraper.module';
import { PhotosModule } from './photos/photos.module';
import { RoomsModule } from './rooms/rooms.module';
import { DateScalar } from './scalars/date.scalar';
import { UsersModule } from './users/users.module';
import { VotesModule } from './votes/votes.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EmojisModule } from './emojis/emojis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(),
    GraphQLModule.forRootAsync(apolloConfig),
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
    CommentsModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    NotificationsModule,
    EmojisModule,
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
