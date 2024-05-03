import { Body, Controller, Get, Post,UploadedFile,UseInterceptors,Response,Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.tdo';
import { HttpStatus,HttpMessage } from 'src/global/globalEnum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar')) 
  async register(@Body() registerDto: RegisterDto, @UploadedFile() file: Express.Multer.File, ): Promise<{ token: string, status: HttpStatus, message: HttpMessage }> {
    try {
      const newUser = await this.authService.register(registerDto, file);
      return {
        token: newUser.token,
        status: HttpStatus.SUCCESS,
        message: HttpMessage.SUCCESS
      };
    } catch (error) {
      return {
        token: null,
        status: HttpStatus.ERROR,
        message: HttpMessage.ERROR
      };
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string, refreshToken: string } | null> {
    try {
      const { accessToken, refreshToken } = await this.authService.login(loginDto);
      return { accessToken, refreshToken };
    } catch (error) {
      return null;
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
  
}