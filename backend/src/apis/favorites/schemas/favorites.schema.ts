import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,SchemaTypes  } from 'mongoose';
import { Article } from 'src/apis/articles/schemas/article.schema';
import { User } from 'src/apis/users/schemas/user.schema'; 


@Schema({
  timestamps: true,
})
export class Favorites  {

  @Prop({ type: 'ObjectId', ref: 'User' } )
  idUser: User
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Article' }] })
  idArticle: Article[]


}

export const FavoritesSchema = SchemaFactory.createForClass(Favorites);
