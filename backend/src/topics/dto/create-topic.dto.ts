import { Article } from 'src/articles/schemas/article.schema';
import { Quiz } from 'src/quizs/schemas/quiz.schema';

export class CreateTopicDto {
  readonly name: string;
  readonly  quizzes: Quiz[];
  readonly  articles: Article[];
  readonly  slug: string;;
}
