import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { Article } from 'src/apis/articles/schemas/article.schema';
import { User } from 'src/apis/users/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Notification  extends Document {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  recipient: User;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  sender: User;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Article' })
  article: Article;

  @Prop({ default: false })
  read: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification );
