import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  display_name: string;

  @IsEmail()
  email: string;

  @IsEnum(['ADMIN', 'USER', 'ACCOUNTANT'], {
    message: 'Valid role required.',
  })
  role: 'ADMIN' | 'USER' | 'ACCOUNTANT';
}
