import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import slugify from 'slugify';
import { Article } from 'src/articles/schemas/article.schema';
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;
  @Prop()
  avatar: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Article' }] })
  articles: Article[];
  
  
  @Prop()
  role: UserRole;
  @Prop()
  slug: string;
  async generateSlug() {
    this.slug = slugify(this.username, { lower: true, remove: /[*+~.()'"!:@]/g });
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
