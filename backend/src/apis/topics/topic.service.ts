import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    const topics = await this.topicModel.find().populate('articles');
    return topics;
  }

  async create(topicDto: Topic): Promise<Topic> {
    try {
      const existingTopic = await this.topicModel.findOne({ name: topicDto.name });
      if (existingTopic) {
        throw new BadRequestException(`Topic with name "${topicDto.name}" already exists.`);
      }
      const newTopic = new this.topicModel({
        name: topicDto.name,
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
      topic = await this.topicModel.findById(identifier).populate({
        path: 'articles',
        populate: { path: 'postedBy' },
      });
    } else {
      topic = await this.topicModel.findOne({ slug: identifier }).populate({
        path: 'articles',
        populate: { path: 'postedBy' },
      });
    }

    if (!topic) {
      throw new NotFoundException('Topic not found.');
    }

    return topic;
  }

  async updateById(id: string, topic: Topic): Promise<Topic> {
    const existingTopic = await this.topicModel.findOne({ name: topic.name, _id: { $ne: id } });
    if (existingTopic) {
      throw new BadRequestException(`Topic with name "${topic.name}" already exists.`);
    }
    return await this.topicModel.findByIdAndUpdate(
      id,
      {
        name: topic.name,
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
