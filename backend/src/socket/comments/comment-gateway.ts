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
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/apis/users/schemas/user.schema';
@WebSocketGateway(3002, { cors: true })
@Injectable()
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(User.name) private userModel: Model<User>, 
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
      const comments = await this.commentModel.find({ idArticle: articleId }).populate('idUser').exec();
        this.server.emit('comments', comments);
         
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  }

  @SubscribeMessage('newComment')
  async handleNewComment(client: Socket, commentDto: CreateCommentDto) {
    try {
      const newComment = new this.commentModel({
        idUser: commentDto.idUser,
        idArticle: commentDto.idArticle,
        parentId: commentDto.parentId,
        content: commentDto.content,
      });

      const savedComment = await newComment.save();

      if (commentDto.parentId) {
        const parentComment = await this.commentModel.findById(commentDto.parentId);
        if (parentComment) {
          parentComment.replies.push(savedComment._id);
          await parentComment.save();
        }
      }

      const populatedComment = await this.commentModel.findById(savedComment._id).populate('idUser');
      this.server.emit('comment', populatedComment);
      return populatedComment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  @SubscribeMessage('updateComment')
  async handleUpdateComment(id: string, comment: UpdateCommentDto) {
    try {
      const updatedComment = await this.commentModel.findByIdAndUpdate(
        comment._id,
        {
          content: comment.content,
        },
        {
          new: true,
          runValidators: true,
        },
      ).populate('idUser'); 
      this.server.emit('updateCommentSuccess', updatedComment);
      return updatedComment;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(client: Socket, commentId: string) {
    try {
      const deletedComment = await this.commentModel.findByIdAndDelete(commentId);
      this.server.emit('deleteCommentSuccess', deletedComment);
      return deletedComment;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
  
}
