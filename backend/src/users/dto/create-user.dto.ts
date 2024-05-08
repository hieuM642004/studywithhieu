import { Article } from 'src/articles/schemas/article.schema';
import { UserRole } from '../schemas/user.schema';

export class CreateUserDto {
  readonly username: string;
  readonly avatar: string;
  readonly email: string;
  readonly password: string;
  readonly articles: Article[];
  readonly role: UserRole;
  readonly slug: string;
  readonly followers: { userId: string; followedAt: Date }[];
}
