import {
  Injectable,
  UnauthorizedException,
  UploadedFile,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Readable } from 'stream';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.tdo';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/schemas/user.schema';
import { GoogleDriveUploader } from 'src/drive/drive.upload';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    private readonly googleDriveUploader: GoogleDriveUploader,
  ) {}

  async register(user: User, file: Express.Multer.File): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const userWithHashedPassword = { ...user, password: hashedPassword };
      const fileStream = Readable.from(file.buffer);
      const fileId = await this.googleDriveUploader.uploadImage(
        fileStream,
        file.originalname,
        '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
      );

      const avatarUrl = this.googleDriveUploader.getThumbnailUrl(fileId);
      const userWithAvatar = { ...userWithHashedPassword, avatar: avatarUrl };
      const res = await this.userModel.create(userWithAvatar);
      return res;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { id: user._id, username: user.username,avatar:user.avatar,email:user.email, role: user.role ,slug:user.slug};

    const accessToken = this.jwtService.sign(payload);

    user.refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await user.save();

    return { accessToken, refreshToken: user.refreshToken  };
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const decodedToken = this.jwtService.decode(refreshToken) as { id: string };

    if (!decodedToken || !decodedToken.id) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userModel.findById(decodedToken.id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { id: user._id, username: user.username, role: user.role };
    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
  async logout(refreshToken: string): Promise<void> {
  
    const decodedToken = this.jwtService.decode(refreshToken) as { id: string };
  
    if (!decodedToken || !decodedToken.id) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  
    const user = await this.userModel.findById(decodedToken.id);
  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  
    
    user.refreshToken = null;
    await user.save();
  }
  
}
