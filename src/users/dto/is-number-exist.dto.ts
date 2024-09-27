import { IsNotEmpty, IsString } from 'class-validator';
export class IsNumberExistDto {
  @IsNotEmpty()
  @IsString()
  mobile: string;
}
