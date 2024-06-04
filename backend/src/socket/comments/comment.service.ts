import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CommentGateway } from './comment-gateway';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: mongoose.Model<Comment>,
    private commentGateway: CommentGateway,
  ) {}

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModel.find();
    return comments;
  }

  async create(commentDto: Comment): Promise<Comment> {
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
      this.commentGateway.server.emit('comment', savedComment);
      return savedComment;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  async findById(identifier: string): Promise<Comment> {
    let comment: Comment;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      comment = await this.commentModel.findById(identifier);
    }

    if (!comment) {
      throw new NotFoundException('Comment not found.');
    }

    return comment;
  }

  async updateById(id: string, comment: Comment): Promise<Comment> {
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
    this.commentGateway.server.emit('comment', updatedComment);
    return updatedComment;
  }

  async deleteById(id: string): Promise<Comment> {
    const deletedComment = await this.commentModel.findByIdAndDelete(id);
    this.commentGateway.server.emit('comment_deleted', id);
    return deletedComment;
  }
}
