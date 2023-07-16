import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({ where: { email: email }, relations:{
      role:true
    } });
  }


  async findSeller() {
    return await this.userRepository.find({where:{role_id:2}});
  }


  async findUser() {
    return await this.userRepository.find({where:{role_id:3}});
  }

  async removeUser(id: number) {
    console.log(id)
    return await this.userRepository.delete(id);
  }


  async removeSeller(id: number) {
    return await this.userRepository.delete(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  
}
