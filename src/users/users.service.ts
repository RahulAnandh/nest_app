import { Model } from 'mongoose';
import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {}

  private users = [
    { id: 1, name: 'Rahul', email: 'rahulanandh80@gmail.com', role: 'ADMIN' },
    { id: 2, name: 'Nikhil', email: 'nikhil@gmail.com', role: 'USER' },
    { id: 3, name: 'Arun', email: 'arun@gmail.com', role: 'ACCOUNTANT' },
    { id: 4, name: 'Sujesh', email: 'sujesh@gmail.com', role: 'USER' },
  ];
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
}
