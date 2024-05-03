import { Article } from 'src/articles/schemas/article.schema';
import { User } from 'src/users/schemas/user.schema';

export class CreateFavoritesDto {
  readonly idUser: User;
  readonly idArticle: Article[];
}
