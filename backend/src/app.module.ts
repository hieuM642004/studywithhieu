import { Module,NestModule ,MiddlewareConsumer } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as bodyParser from 'body-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//Modules
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/JWT/jwt.decode';
import { ArticleModule } from './articles/article.module';
import { QuizModule } from './quizs/quiz.module';
import { TopicModule } from './topics/topic.module';
import { FavoritesModule } from './favorites/favorites.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    ArticleModule,
    QuizModule,
    TopicModule,
    FavoritesModule,
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
