import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Topic } from './schemas/topic.schema';
@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name)
    private topicModel: mongoose.Model<Topic>,
  ) {}

  async findAll(): Promise<Topic[]> {
    const topics = await this.topicModel.find();
    return topics;
  }

  async create(topicDto: Topic): Promise<Topic> {
    try {
      const quizzesString = topicDto.quizzes.join(',');
      const quizzesArray = quizzesString
        .split(',')
        .map((quizz) => quizz.trim());
      const newTopic = new this.topicModel({
        name: topicDto.name,
        quizzes: quizzesArray,
        articles: topicDto.articles,
        slug: topicDto.slug,
      });
      return newTopic.save();
    } catch (error) {
      console.error('Error creating topic:', error);
      throw error;
    }
  }

  async findById(identifier: string): Promise<Topic> {
    let topic: Topic;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      topic = await this.topicModel.findById(identifier);
    } else {
      topic = await this.topicModel.findOne({ slug: identifier });
    }

    if (!topic) {
      throw new NotFoundException('Topic not found.');
    }

    return topic;
  }

  async updateById(id: string, topic: Topic): Promise<Topic> {
    const quizzesString = topic.quizzes.join(',');
    const quizzesArray = quizzesString
      .split(',')
      .map((option) => option.trim());
    return await this.topicModel.findByIdAndUpdate(
      id,
      {
        name: topic.name,
        quizzes: quizzesArray,
        articles: topic.articles,
        slug: topic.slug,
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async deleteById(id: string): Promise<Topic> {
    return await this.topicModel.findByIdAndDelete(id);
  }
}
