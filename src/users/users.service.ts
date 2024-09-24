import { Model } from 'mongoose';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  findAll(role?: 'ADMIN' | 'USER' | 'ACCOUNTANT') {
    if (role) {
      return this.usersModel.find({ role: role });
    }
    return this.usersModel.find();
  }
  findOne(id: string) {
    const user = this.usersModel.findOne({
      _id: Object(id),
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }
  create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.usersModel(createUserDto);
    if (!createdUser) throw new NotFoundException('User can not be created.');
    return createdUser.save();
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    const updated_user = this.usersModel.findOneAndUpdate(
      { _id: Object(id) },
      updateUserDto,
      { new: true },
    );
    if (!updated_user)
      throw new NotAcceptableException('User can not be updated.');
    return updated_user;
  }
  delete(id: string) {
    const deleted_user = this.usersModel.findOneAndDelete({ _id: Object(id) });
    if (!deleted_user) throw new NotFoundException('User can not be deleted.');
    return deleted_user;
  }
  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersModel.findOne({
      user_name: loginUserDto.user_name,
      password: loginUserDto.password,
    });
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return {
        login_status: true,
        token: '123',
      };
    }
  }
}
