import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import slugify from 'slugify';
import { Episode } from 'src/apis/articles copy/schemas/episode.schema';
import { SchemaTypes, Types } from 'mongoose';
@Schema({
  timestamps: true,
})
export class Article  { 

  @Prop()
  title: string;
  @Prop()
  images: string[];

  @Prop()
  content: string;

  @Prop({default:0})
  views: number;

  @Prop({ type: 'ObjectId', ref: 'User' }) 
  postedBy: string;
  @Prop({ type: 'ObjectId', ref: 'Topic' }) 
  idTopic: string;
  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Episode' }] })
  episodes: Episode[];
  @Prop()
  slug: string;
  async generateSlug() {
    this.slug = slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g });
  }
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
