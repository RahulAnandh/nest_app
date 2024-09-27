import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { IsNumberExistDto } from './dto/is-number-exist.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll(@Query('role') role?: 'ADMIN' | 'USER' | 'ACCOUNTANT') {
    return this.userService.findAll(role);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
  @Post()
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.userService.create(createUserDto);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
  @Post('/login')
  login(
    @Body(ValidationPipe)
    loginUserDto: LoginUserDto,
  ) {
    return this.userService.login(loginUserDto);
  }
  @Post('/login/is_number_exist')
  isNumberExist(
    @Body(ValidationPipe)
    isNumberExistDto: IsNumberExistDto,
  ) {
    return this.userService.isNumberExist(isNumberExistDto);
  }
}
