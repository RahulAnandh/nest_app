import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[1-9])/, {
    message: 'password should contain atleast one number',
  })
  password: string;
}
