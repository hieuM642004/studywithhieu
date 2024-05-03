import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors, UploadedFiles,
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './schemas/quiz.schema';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/authorization.guard';
import { Topic } from 'src/topics/schemas/topic.schema';

@Controller('quizs')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}
  @Get()
  // @UseGuards(AdminGuard)
  async getAllQuizs(): Promise<ResponseData<Quiz[]>> {
    try {
      const quizs = await this.quizService.findAll();
      return new ResponseData<Quiz[]>(quizs, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Quiz[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  async createQuiz(
    @Body() quiz: CreateQuizDto,
  ): Promise<ResponseData<Quiz>> {
    try {
      const newQuiz = await this.quizService.create(quiz);
      return new ResponseData<Quiz>(newQuiz, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Quiz>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Get(':id')
  async getQuiz(
    @Param('id') id: string,
  ): Promise<ResponseData<Quiz>> {
    try {
      const foundQuiz = await this.quizService.findById(id);
      return new ResponseData<Quiz>(foundQuiz, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Quiz>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Put(':id')
  async updateQuiz(
    @Param('id') id: string,
    @Body() quiz: UpdateQuizDto,
  ): Promise<ResponseData<Quiz>> {
    try {
      const updatedQuiz = await this.quizService.updateById(id, quiz);
      return new ResponseData<Quiz>(updatedQuiz, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Quiz>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete(':id')
  async deleteQuiz(
    @Param('id') id: string,
  ): Promise<ResponseData<Quiz>> {
    try {
      const deletedQuiz= await this.quizService.deleteById(id);
      return new ResponseData<Quiz>(deletedQuiz, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Quiz>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
