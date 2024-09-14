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
  findAll(role?: 'ADMIN' | 'MANAGER' | 'ACCOUNTANT') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('User role not found.');
      return rolesArray;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }
  create(id: number, createUserDto: CreateUserDto): Promise<Users> {
    const createdUser = new this.usersModel(CreateUserDto);
    return createdUser.save();
  }
  update(id: number, updateUserDto: UpdateUserDto) {}
  delete(id: number) {
    const user = this.users.find((user) => {
      user.id === id;
    });
    return user;
  }
}
