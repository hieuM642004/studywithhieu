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
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './schemas/topic.schema';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/authorization.guard';

@Controller('topics')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}
  @Get()
  // @UseGuards(AdminGuard)
  async getAllTopics(): Promise<ResponseData<Topic[]>> {
    try {
      const topics = await this.topicService.findAll();
      return new ResponseData<Topic[]>(topics, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  async createTopic(
    @Body() topicDto: CreateTopicDto,
  ): Promise<ResponseData<Topic>> {
    try {
      const newTopic = new Topic();
    Object.assign(newTopic, topicDto);
    newTopic.generateSlug();

  
    const createdTopic = await this.topicService.create(newTopic);
      return new ResponseData<Topic>(createdTopic, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Get(':identifier')
  async getTopic(
    @Param('identifier') identifier: string,
  ): Promise<ResponseData<Topic>> {
    try {
      const foundTopic = await this.topicService.findById(identifier);
      return new ResponseData<Topic>(foundTopic, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Put(':id')
  async updateTopic(
    @Param('id') id: string,
    @Body() topicDto: Topic,
  ): Promise<ResponseData<Topic>> {
    try {
      const updatedTopic = new Topic(); 
      Object.assign(updatedTopic, topicDto); 

    
      updatedTopic.generateSlug();
      const saveTopic = await this.topicService.updateById(id, updatedTopic);
      return new ResponseData<Topic>(saveTopic, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete(':id')
  async deleteTopic(
    @Param('id') id: string,
  ): Promise<ResponseData<Topic>> {
    try {
      const deletedTopic = await this.topicService.deleteById(id);
      return new ResponseData<Topic>(deletedTopic, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Topic>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
