import { Module,NestModule ,MiddlewareConsumer } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as bodyParser from 'body-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import cors from 'cors'
//Modules
import { ArticleModule } from './apis/articles/article.module';
import { TopicModule } from './apis/topics/topic.module';
import { FavoritesModule } from './apis/favorites/favorites.module';
import { EpisodeModule } from './apis/articles copy/episode.module';
import { UserModule } from './apis/users/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/JWT/jwt.decode';
import { CommentModule } from './socket/comments/comment.module';
import { NotificationModule } from './socket/notification/nofication.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    ArticleModule,
    TopicModule,
    FavoritesModule,
    EpisodeModule,
    CommentModule,
   NotificationModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
    consumer.apply(JwtMiddleware).forRoutes('*');
    consumer.apply(bodyParser.urlencoded({ extended: true })).forRoutes('*');
    consumer.apply(bodyParser.json()).forRoutes('*');
  }
}



