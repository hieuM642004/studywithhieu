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
  import { AuthGuard } from '@nestjs/passport';
  import { AdminGuard } from 'src/auth/guards/authorization.guard';
  import { UpdateCommentDto } from './dto/update-comment.dto'; 
  import { Comment } from './schemas/comment.schema'; 
  import { CreateCommentDto } from './dto/create-comment.dto';
  import { CommentService } from './comment.service'; 
  @Controller('comments')
  export class CommentController  {
    constructor(private readonly commentService: CommentService) {}
    @Get()
    // @UseGuards(AdminGuard)
    async getAllComments(): Promise<ResponseData<Comment>> {
      try {
        const paginatedResult = await this.commentService.findAll();
        return new ResponseData<Comment>(paginatedResult, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
      } catch (error) {
        return new ResponseData<Comment>(null, HttpStatus.ERROR, HttpMessage.ERROR);
      }
    }
    
  
    @Post()
  
    async createComment(
      @Body() commentDto: CreateCommentDto, 
    ): Promise<ResponseData<Comment>> {
      try {
        const newComment = new Comment(); 
        Object.assign(newComment, commentDto);
        const saveComment = await this.commentService.create(newComment);
        return new ResponseData<Comment>(saveComment, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
      } catch (error) {
        return new ResponseData<Comment>(null, HttpStatus.ERROR, HttpMessage.ERROR);
      }
    }
    
  
  
    @Get(':identifier')
    async getComment(
      @Param('identifier') identifier: string,
    ): Promise<ResponseData<Comment>> {
      try {
        const foundComment = await this.commentService.findById(identifier);
        return new ResponseData<Comment>(foundComment, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
      } catch (error) {
        return new ResponseData<Comment>(null, HttpStatus.ERROR, HttpMessage.ERROR);
      }
    }
  
  
    @Put(':id')

    async updateComment(
      @Param('id') id: string,
      @Body() updateCommentDto: UpdateCommentDto, 
      
    ): Promise<ResponseData<Comment>> {
      try {
        
        const updatedComment = new Comment(); 
        Object.assign(updatedComment, updateCommentDto); 
    
        const savedComment = await this.commentService.updateById(id, updatedComment);
       
        return new ResponseData<Comment>(savedComment, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
      } catch (error) {
        console.error('Error updating comment:', error);
        return new ResponseData<Comment>(null, HttpStatus.ERROR, HttpMessage.ERROR);
      }
    }
    
  
    @Delete(':id')
    async deleteComment(
      @Param('id') id: string,
    ): Promise<ResponseData<Comment>> {
      try {
        const deletedComment = await this.commentService.deleteById(id);
        return new ResponseData<Comment>(deletedComment, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
      } catch (error) {
        return new ResponseData<Comment>(null, HttpStatus.ERROR, HttpMessage.ERROR);
      }
    }
  }
  