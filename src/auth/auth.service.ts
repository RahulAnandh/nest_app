import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LogInDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  signUp(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }
  logIn(loginDto: LogInDto) {
    return loginDto;
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
