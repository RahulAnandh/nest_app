import { IsEmail, IsString } from 'class-validator';

export class LogInDto {
  @IsEmail()
  user_name: string;

  @IsString()
  password: string;
}
