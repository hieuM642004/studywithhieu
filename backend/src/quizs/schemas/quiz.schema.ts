import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Quiz  {
  @Prop()
  question: string; 

  @Prop()
  options: string[]; 

  @Prop()
  correctOptionIndex: number; 
  @Prop({ type: 'ObjectId', ref: 'Topic' })
  idTopic: string; 

}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
