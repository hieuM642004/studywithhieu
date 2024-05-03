import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { QuizSchema } from './schemas/quiz.schema';
import { AuthModule } from 'src/auth/auth.module';
import { TopicModule } from 'src/topics/topic.module';
import { TopicSchema } from 'src/topics/schemas/topic.schema';
import { TopicController } from 'src/topics/topic.controller';
import { TopicService } from 'src/topics/topic.service';

@Module({
  imports: [
    TopicModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Quiz', schema: QuizSchema },
      { name: 'Topic', schema: TopicSchema }, 
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule {}
