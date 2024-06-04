import { Episode } from "src/apis/articles copy/schemas/episode.schema";
export class UpdateArticleDto {
  readonly title: string;
  readonly images: string[];
  readonly content: string;
  readonly views: number;
  readonly postedBy: string;
  readonly  idTopic: string;
  readonly  slug: string;
  readonly  episodes: Episode[];
  
}
