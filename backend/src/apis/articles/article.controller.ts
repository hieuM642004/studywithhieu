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
  SetMetadata,
  Query
  
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './schemas/article.schema';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/authorization.guard';
import { PaginatedResult } from './interface/pagination.interface';
import { NotificationGateway } from 'src/socket/notification/nofication-gateway';
@Controller('articles')
export class ArticleController  {
  constructor(private readonly articleService: ArticleService) {}
  @Get()
  // @UseGuards(AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  async getAllArticles(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('search') searchQuery?: string): Promise<ResponseData<PaginatedResult<Article>>> {
    try {
      const paginatedResult = await this.articleService.findAll(page, limit, searchQuery);
      return new ResponseData<PaginatedResult<Article>>(paginatedResult, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<PaginatedResult<Article>>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  @Get('/top')
  async getTopArticles(): Promise<ResponseData<Article[]>> {
    try {
      const topArticles = await this.articleService.findTopArticles();
      return new ResponseData<Article[]>(topArticles, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Article[]>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  

  @Post()
  @UseInterceptors(FilesInterceptor('images', 10))
  async createArticle(
    @Body() articleDto: CreateArticleDto, 
    @UploadedFiles() files: Express.Multer.File[], 
  ): Promise<ResponseData<Article>> {
    try {
      
      const newArticle = new Article(); 
      Object.assign(newArticle, articleDto);

      
      newArticle.generateSlug();

      const savedArticle = await this.articleService.create(newArticle, files);
      
      return new ResponseData<Article>(savedArticle, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Article>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Get(':identifier')
  async getArticle(
    @Param('identifier') identifier: string,
  ): Promise<ResponseData<Article>> {
    try {
      const foundArticle = await this.articleService.findById(identifier);
      return new ResponseData<Article>(foundArticle, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Article>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Put(':id')
  @UseInterceptors(FilesInterceptor('images', 10)) 
  async updateArticle(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto, 
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ResponseData<Article>> {
    try {
     
      const updatedArticle = new Article(); 
      Object.assign(updatedArticle, updateArticleDto); 

    
      updatedArticle.generateSlug();

      const savedArticle = await this.articleService.updateById(id, updatedArticle, files);
      
      return new ResponseData<Article>(savedArticle, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Article>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete(':id')
  async deleteArticle(
    @Param('id') id: string,
  ): Promise<ResponseData<Article>> {
    try {
      const deletedArticle = await this.articleService.deleteById(id);
      return new ResponseData<Article>(deletedArticle, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Article>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
