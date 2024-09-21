import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const user = this.usersModel.find({
      _id: Object(id),
    });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }
  create(createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.usersModel(createUserDto);
    return createdUser.save();
  }
  update(id: string, updateUserDto: UpdateUserDto) {
    const updated_user = this.usersModel.findOneAndUpdate(
      { _id: Object(id) },
      updateUserDto,
      { new: true },
    );
    return updated_user;
  }
  delete(id: number) {
    const user = this.users.find((user) => {
      user.id === id;
    });
    return user;
  }
}
