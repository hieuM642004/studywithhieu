import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EpisodeSchema } from './schemas/episode.schema';
import { EpisodeController } from './episode.controller';
import { EpisodeService } from './episode.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Episode', schema: EpisodeSchema }
    ]),
  ],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodeModule {}
