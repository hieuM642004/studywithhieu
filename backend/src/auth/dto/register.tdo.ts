import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/apis/users/schemas/user.schema';


export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  readonly avatar: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
  readonly role: UserRole;
  readonly  slug: string;
}
