import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  SetMetadata,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/authorization.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  // @UseGuards(AdminGuard)
  async getAllUsers(): Promise<ResponseData<User[]>> {
    try {
      const users = await this.userService.findAll();
      return new ResponseData<User[]>(
        users,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<User[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async createUser(
    @Body() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseData<User>> {
    try {
      const newUser = new User();
      Object.assign(newUser, user);
      newUser.generateSlug();
      const saveUser = await this.userService.create(newUser, file);
      return new ResponseData<User>(
        saveUser,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':identifier')
  async getUser(
    @Param('identifier') identifier: string,
  ): Promise<ResponseData<User>> {
    try {
      const foundUser = await this.userService.findById(identifier);
      return new ResponseData<User>(
        foundUser,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async updateUser(
    @Param('id') id: string,
    @Body() userDto: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseData<User>> {
    try {
      const updatedUser = new User();
      Object.assign(updatedUser, userDto);

      updatedUser.generateSlug();
      const saveUser = await this.userService.updateById(id, updatedUser, file);
      return new ResponseData<User>(
        saveUser,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<ResponseData<User>> {
    try {
      const deletedUser = await this.userService.deleteById(id);
      return new ResponseData<User>(
        deletedUser,
        HttpStatus.SUCCESS,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  @Post('/follow')
  async followUser(@Body() body: any): Promise<ResponseData<User>> {
    try {
      const { userId, followerId } = body;
      const follower = await this.userService.followUser(userId, followerId);
      return new ResponseData<User>(
        follower,
        HttpStatus.SUCCESS,
        'User followed successfully.',
      );
    } catch (error) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post('/unfollow')
  async unfollowUser(@Body() body: any): Promise<ResponseData<User>> {
    try {
      const { userId, followerId } = body;
      const follower = await this.userService.unfollowUser(userId, followerId);
      return new ResponseData<User>(
        follower,
        HttpStatus.SUCCESS,
        'User unfollowed successfully.',
      );
    } catch (error) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
