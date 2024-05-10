import { Article } from "src/apis/articles/schemas/article.schema";


export class CreateTopicDto {
  readonly name: string;
  readonly  articles: Article[];
  readonly  slug: string;;
}
