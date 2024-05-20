import { Body, Controller, Get, Post,UploadedFile,UseInterceptors,Response,Res, UnauthorizedException ,Query} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.tdo';

import { HttpStatus,HttpMessage } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { User } from 'src/apis/users/schemas/user.schema';
import { log } from 'console';
UnauthorizedException
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar')) 
  async register(
    @Body() user: User,
    @UploadedFile() file: Express.Multer.File, 
  ): Promise<ResponseData<User>> {
    try {
      const newUser =new User()
      Object.assign(newUser,user)
newUser.generateSlug()
     const saveUser=  await this.authService.register(newUser, file);
      return new ResponseData<User>(saveUser, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<User>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string } | null> {
    try {
      const { accessToken, refreshToken } = await this.authService.login(loginDto);
      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
  @Post('/refresh-token')
  async refreshToken(@Body() { refresh_token }): Promise<{ accessToken: string, refreshToken: string } | null> {
    try {
      const { accessToken, refreshToken } = await this.authService.refreshToken(refresh_token);
      return { accessToken, refreshToken };
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }
  @Post('/logout')
  async logout(@Body() body: any): Promise<{ message: string }> {
    const { refresh_token } = body;
    try {
      await this.authService.logout(refresh_token);
      return { message: 'Logged out successfully' };
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  }
  @Post('/forgot-password')
  async forgotPassword(@Body() body: any): Promise<{ message: string }> {
    
    
    const { email } = body;
    try {
      await this.authService.forgotPassword(email);
      return { message: 'Password reset email sent' };
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }
  @Post('/reset-password')
async resetPassword(@Query('token') token: string, @Body('newPassword') newPassword: string): Promise<{ message: string }> {
  try {
    await this.authService.resetPassword(token, newPassword);
    return { message: 'Password reset successful' };
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}

}