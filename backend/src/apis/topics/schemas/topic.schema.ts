import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import slugify from 'slugify';
import { Article } from 'src/apis/articles/schemas/article.schema';

@Schema({
  timestamps: true,
})
export class Topic {
  @Prop()
  name: string;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Article' }] })
  articles: Article[];
  @Prop()
  slug: string;
  async generateSlug() {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g });
  }
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
