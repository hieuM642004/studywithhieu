import { Article } from "src/apis/articles/schemas/article.schema";


export class UpdateTopicDto {
  readonly name: string;
  readonly  articles: Article[];
  readonly  slug: string;;

}
