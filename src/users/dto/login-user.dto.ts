import { IsNotEmpty, IsString } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
