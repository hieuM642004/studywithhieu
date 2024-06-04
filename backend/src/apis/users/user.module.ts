import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schema';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService,GoogleDriveUploader],
})
export class UserModule {}
