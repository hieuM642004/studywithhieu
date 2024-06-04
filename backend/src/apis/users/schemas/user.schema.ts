import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import slugify from 'slugify';
import { Article } from 'src/apis/articles/schemas/article.schema';
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Schema({ timestamps: true })
export class User {
  @Prop()
  username: string;

  @Prop()
  avatar: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Article' }] })
  articles: Article[];

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop()
  refreshToken: string;

  @Prop()
  passwordResetToken: string;

  @Prop()
  passwordResetExpires: string;

  @Prop()
  slug: string;
  @Prop({
    type: [
      { userId: { type: SchemaTypes.ObjectId, ref: 'User' }, followedAt: Date },
    ],
  })
  followers: { userId: string; followedAt: Date }[];

  async generateSlug() {
    this.slug = slugify(this.username, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
