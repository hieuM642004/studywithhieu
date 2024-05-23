import { Article } from 'src/apis/articles/schemas/article.schema';
import { User } from 'src/apis/users/schemas/user.schema';

export class CreateNotificationDto {
  readonly recipient: User;
  readonly sender: User;
  readonly article: Article;
  readonly read: boolean;
}
