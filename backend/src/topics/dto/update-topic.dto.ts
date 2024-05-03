import { Article } from 'src/articles/schemas/article.schema';
import { Quiz } from 'src/quizs/schemas/quiz.schema';

export class UpdateTopicDto {
  readonly name: string;
  readonly  quizzes: Quiz[];
  readonly  articles: Article[];
  readonly  slug: string;;

}
