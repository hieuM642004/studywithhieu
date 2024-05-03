import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quiz } from './schemas/quiz.schema';
import { Topic } from '../topics/schemas/topic.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name)
    private readonly quizModel: Model<Quiz>,
    @InjectModel(Topic.name)
    private readonly topicModel: Model<Topic>,
  ) {}

  async findAll(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  async create(quizDto: Quiz): Promise<Quiz> {
    try {
      const optionsArray = quizDto.options.map((option) => option.trim());
      const newQuiz = new this.quizModel({
        question: quizDto.question,
        options: optionsArray,
        correctOptionIndex: quizDto.correctOptionIndex,
        idTopic: quizDto.idTopic,
      });
      const createdQuiz = await newQuiz.save();

      await this.topicModel.findByIdAndUpdate(
        quizDto.idTopic,
        { $push: { quizzes: createdQuiz._id } },
        { new: true },
      );

      return createdQuiz;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(id).exec();
    if (!quiz) {
      throw new NotFoundException('Quiz not found.');
    }
    return quiz;
  }

  async updateById(id: string, quiz: Quiz): Promise<Quiz> {
    const optionsArray = quiz.options.map((option) => option.trim());
    return await this.quizModel
      .findByIdAndUpdate(
        id,
        {
          question: quiz.question,
          options: optionsArray,
          correctOptionIndex: quiz.correctOptionIndex,
          idTopic: quiz.idTopic,
        },
        { new: true, runValidators: true },
      )
      .exec();
  }

  async deleteById(id: string): Promise<Quiz> {
    try {
      const deletedQuiz = await this.quizModel.findByIdAndDelete(id);

      await this.topicModel.updateOne(
        { quizzes: id },
        { $pull: { quizzes: id } },
      );

      return deletedQuiz;
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  }
}
