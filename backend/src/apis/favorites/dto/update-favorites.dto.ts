import { Article } from 'src/apis/articles/schemas/article.schema';
import { User } from 'src/apis/users/schemas/user.schema';

export class UpdateFavoritesDto {
  readonly idUser: User;
  readonly idArticle: Article[];
}
