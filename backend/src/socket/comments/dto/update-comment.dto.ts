import { Article } from 'src/apis/articles/schemas/article.schema';
import { User } from 'src/apis/users/schemas/user.schema';

export class UpdateCommentDto {
  readonly idUser: User;
  readonly idArticle: Article;
  readonly parentId: Comment;
  readonly content: string;
  readonly replies: Comment[];
}
