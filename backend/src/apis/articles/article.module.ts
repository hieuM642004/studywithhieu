import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleSchema } from './schemas/article.schema';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { AuthModule } from 'src/auth/auth.module';

import { FavoritesModule } from '../favorites/favorites.module';
import { FavoritesSchema } from '../favorites/schemas/favorites.schema';
import { TopicModule } from '../topics/topic.module';
import { TopicSchema } from '../topics/schemas/topic.schema';
import { UserSchema } from '../users/schemas/user.schema';
import { UserModule } from '../users/user.module';

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
      { name: 'Favorites', schema: FavoritesSchema },
    ]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService, GoogleDriveUploader],
})
export class ArticleModule {}
