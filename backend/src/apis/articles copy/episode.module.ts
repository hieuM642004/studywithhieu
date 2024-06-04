import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EpisodeSchema } from './schemas/episode.schema';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';
import { ArticleModule } from '../articles/article.module';
import { ArticleSchema } from '../articles/schemas/article.schema';

@Module({
  imports: [
    ArticleModule,
    MongooseModule.forFeature([
      { name: 'Episode', schema: EpisodeSchema },
      { name: 'Article', schema: ArticleSchema }
    ]),
   
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}
