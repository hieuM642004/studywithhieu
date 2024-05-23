import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationGateway } from './nofication-gateway'; 
import { Notification, NotificationSchema } from './schemas/nofication.schema';
import { User, UserSchema } from 'src/apis/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [NotificationGateway],
  exports: [NotificationGateway],
})
export class NotificationModule {}
