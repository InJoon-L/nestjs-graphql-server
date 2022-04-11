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
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
