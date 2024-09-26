import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LogInDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  signUp(createAuthDto: CreateAuthDto) {
    return createAuthDto;
  }
  async logIn(loginDto: LogInDto): Promise<{ access_token: string } | any> {
    const result = await this.usersService.login({
      user_name: loginDto.user_name,
      password: loginDto.password,
    });
    if (result?.password !== loginDto.password) {
      return result;
    } else {
      const payload = { sub: result.user_name, username: result.password };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
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
