import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleSchema } from './schemas/article.schema';
import { GoogleDriveUploader } from 'src/drive/drive.upload';
import { AuthModule } from 'src/auth/auth.module';
import { TopicModule } from 'src/topics/topic.module';
import { TopicSchema } from 'src/topics/schemas/topic.schema';
import { UserSchema } from 'src/users/schemas/user.schema';
import { UserModule } from 'src/users/user.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { FavoritesSchema } from 'src/favorites/schemas/favorites.schema';

@Module({
  imports: [
    TopicModule,
    UserModule,
    AuthModule,
    FavoritesModule,
    MongooseModule.forFeature([
      { name: 'Article', schema: ArticleSchema },
      { name: 'Topic', schema: TopicSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Favorites', schema: FavoritesSchema }
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, GoogleDriveUploader],
})
export class ArticleModule {}
