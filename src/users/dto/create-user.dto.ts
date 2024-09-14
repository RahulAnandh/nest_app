import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsString()
  display_name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'USER', 'ACCOUNTANT'], {
    message: 'Valid role required.',
  })
  role: 'ADMIN' | 'USER' | 'ACCOUNTANT';
}
