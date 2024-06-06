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
import { Notification } from './schemas/nofication.schema';
import { Injectable } from '@nestjs/common';

import { User } from 'src/apis/users/schemas/user.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-nofication.dto';
import { log } from 'console';
@WebSocketGateway(3002, { cors: true })
@Injectable()
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    try {
      console.log('NotificationGateway constructor initialized successfully.');
    } catch (error) {
      console.error(
        'Error initializing NotificationGateway constructor:',
        error,
      );
    }
  }

  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('New client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('requestNotifications')
  async handleRequestNotifications(client: Socket, userId: string) {
    try {
      const notifications = await this.notificationModel
        .find({ recipient: userId})
        .where({ recipient: userId})
        .populate('recipient')
        .populate('sender')
        .populate('article') 
        .exec();

      this.server.emit('notifications', notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  @SubscribeMessage('newArticle')
  async handleNewNotification(
    @MessageBody() articleData: { userId: string; articleId: string },
  ) {
    try {
      console.log('Received newArticle event:', articleData);

      const { userId, articleId } = articleData;

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const followers = await this.userModel.find({
        'followers.userId': userId,
      });
      const followerIds = followers.map((follower) => follower._id.toString());

      console.log('Followers to notify:', followerIds);

      const newNotificationPromises = followerIds.map(async (followerId) => {
        const newNotification = new this.notificationModel({
          recipient: followerId,
          sender: userId,
          article: articleId,
          read: false,
        });

        const savedNotification = await newNotification.save();
        return this.notificationModel
          .findById(savedNotification._id)
          .populate('recipient')
          .populate('sender')
          .populate('article') ;
      });

      const populatedNotifications = await Promise.all(newNotificationPromises);

      // Send the notifications to all clients
      populatedNotifications.forEach((notification) => {
        this.server.emit('notification', notification);
      });

      return populatedNotifications;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  // @SubscribeMessage('deleteNotification')
  // async handleDeleteNotification(client: Socket, notificationId: string) {
  //   try {
  //     const deletedNotification = await this.notificationModel.findByIdAndDelete(notificationId);
  //     this.server.emit('deleteNotificationSuccess', deletedNotification);
  //     return deletedNotification;
  //   } catch (error) {
  //     console.error('Error deleting notification:', error);
  //     throw error;
  //   }
  // }
}
