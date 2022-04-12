import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './model/user.model';
import { CreateUserResponse } from './response';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<CreateUserResponse> {
    try {
      const exists = await this.userRepository.findOne({email: createUserInput.email});
      
      if (exists) {
        return { status: false, msg: "email already" };
      }
    
      const user = await this.userRepository.save(this.userRepository.create(createUserInput));
      return { status: true, user: user, msg: "Created"};
    } catch (e) {
      console.log(e);
      return { status: false, msg: "Couldn't create account" };
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return this.userRepository.find();
    } catch (e) {
      console.log(e)
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return this.userRepository.findOneOrFail(id);
    } catch (e) {
      console.log(e)
    }
  }

  async update(updateUserInput: UpdateUserInput): Promise<User> {
    try {
      const user = await this.userRepository.findOneOrFail(updateUserInput.id);
      user.email = updateUserInput.data.email;
      user.name = updateUserInput.data.name;
      user.password = updateUserInput.data.password;
      
      if (updateUserInput.data.image) {
        user.image = updateUserInput.data.image;
      }

      await this.userRepository.save(user, { reload: false });
     
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: number):Promise<boolean> {
    try {
      await this.userRepository.delete(id);

      return true;
    } catch (e) {
      console.log(e)

      return false;
    }
  }
}
