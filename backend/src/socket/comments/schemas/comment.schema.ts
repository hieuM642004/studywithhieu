import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Article } from 'src/apis/articles/schemas/article.schema';
import { User } from 'src/apis/users/schemas/user.schema'; 

@Schema({
  timestamps: true,
})
export class Comment extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  idUser: User;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Article', required: true })
  idArticle: Article;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Comment', default: null })
  parentId: Comment;

  @Prop({ required: true })
  content: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Comment' }], default: [] })
  replies: Comment[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
