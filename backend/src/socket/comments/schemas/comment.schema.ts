import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,SchemaTypes  } from 'mongoose';
import { Article } from 'src/apis/articles/schemas/article.schema';
import { User } from 'src/apis/users/schemas/user.schema'; 


@Schema({
  timestamps: true,
})
export class Comment  {
    @Prop({ type: 'ObjectId', ref: 'User' })
    idUser: User;
  
    @Prop({ type: 'ObjectId', ref: 'Article' })
    idArticle: Article;
  
    @Prop({ type: 'ObjectId', ref: 'Comment', default: null })
    parentId: Comment;
  
    @Prop()
    content: string;
  
    @Prop({ type: [{ type: 'ObjectId', ref: 'Comment' }], default: [] })
    replies: Comment[];

}

export const CommentSchema = SchemaFactory.createForClass(Comment);
