import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { TopicSchema } from './schemas/topic.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,MongooseModule.forFeature([{ name: 'Topic', schema: TopicSchema }])],
  controllers: [TopicController],
  providers: [TopicService],
})
export class TopicModule {}
