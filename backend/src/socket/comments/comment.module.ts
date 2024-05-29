import { Module } from '@nestjs/common';
import { CommentGateway } from './comment-gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schemas/comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { UserModule } from 'src/apis/users/user.module';
import { UserSchema } from 'src/apis/users/schemas/user.schema';


@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'Comment', schema: CommentSchema },
      { name: 'User', schema: UserSchema },
    ]),
    
  ],
  controllers: [],
  providers: [CommentGateway],
})
export class CommentModule {}
