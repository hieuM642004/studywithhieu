import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import mongoose, { Model } from 'mongoose';
import { Server, Socket } from 'socket.io';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './schemas/comment.schema';
import { Injectable } from '@nestjs/common';
Comment;
@WebSocketGateway(3002, { cors: true })
@Injectable()
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectModel(Comment.name)
    private commentModel: mongoose.Model<Comment>,
  ) {}
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }
  @SubscribeMessage('requestComments')
  async handleRequestComments(client: Socket, articleId: string) {
    try {
      console.log(articleId);
      
      const comments = await this.commentModel.find({ idArticle: articleId }).exec();
      this.server.emit('comments', comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }
  

  @SubscribeMessage('newComment')
  async handleNewComment(client: Socket, commentDto: Comment) {
    try {
      let repliesArray: string[] = [];
      if (commentDto.replies && Array.isArray(commentDto.replies)) {
        const repliesString = commentDto.replies.join(',');
        repliesArray = repliesString.split(',').map((r) => r.trim());
      }
      const newComment = new this.commentModel({
        idUser: commentDto.idUser,
        idArticle: commentDto.idArticle,
        parentId: commentDto.parentId,
        content: commentDto.content,
        replies: repliesArray,
      });
      const savedComment = await newComment.save();
      this.server.emit('comment', savedComment);
      return savedComment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  @SubscribeMessage('updateComment')
  async handleUpdateComment(id: string, comment: Comment) {
    try {
      const updatedComment = await this.commentModel.findByIdAndUpdate(
        id,
        {
          idUser: comment.idUser,
          idArticle: comment.idArticle,
          parentId: comment.parentId,
          content: comment.content,
          replies: comment.replies,
        },
        {
          new: true,
          runValidators: true,
        },
      );
      this.server.emit('updateComment', updatedComment);
      return updatedComment;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(client: Socket, commentId: string) {
    try {
      const deletedComment =
        await this.commentModel.findByIdAndDelete(commentId);
      this.server.emit('commedeleteCommentnt', commentId);
      return deletedComment;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}
