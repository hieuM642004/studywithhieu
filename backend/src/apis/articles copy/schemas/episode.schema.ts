import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema({
  timestamps: true,
})
export class Episode   {
  @Prop()
  title: string;
  
  @Prop()
  description: string;
  
  @Prop()
  audioUrl: string;
  
  @Prop({ default: 0 })
  duration: number; 
  @Prop({ type: 'ObjectId', ref: 'Article' })
  idPodcast: string;
}

export const EpisodeSchema = SchemaFactory.createForClass(Episode );
