import {
  Controller,
  Body,
  Patch,
  Param
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @MessagePattern({ cmd: 'register_user' })
  async registerUser(@Payload() message: User): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(message.password, salt);
    const bodyData: any = {
      name: message.name,
      email: message.email,
      password: hashedPassword,
      phone: message.phone,
      role_id: 3,
    };
    console.log(bodyData);
    return await this.userService.create(bodyData);
  }

  @MessagePattern({ cmd: 'register_seller' })
  async registerSeller(@Payload() message: User): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(message.password, salt);
    const bodyData: any = {
      name: message.name,
      email: message.email,
      password: hashedPassword,
      phone: message.phone,
      role_id: 2,
    };
    console.log(bodyData);
    return await this.userService.create(bodyData);
  }

  @MessagePattern({ cmd: 'login' })
  async login(message: User): Promise<any> {
    const email = message.email;
    console.log(email);
    const user = await this.userService.findOne(email);
    const role = user.role.role_name;
    if (!user) {
      return 'User does exist';
    }
    const validUser = await bcrypt.compare(message.password, user.password);
    if (!validUser) {
      return 'Invalid Password';
    }

    const jwt = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      role: role,
    });

    return { jwt };
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser() {
    return await this.userService.findUser();
  }

  @MessagePattern({ cmd: 'get_seller' })
  async getSeller() {
    return await this.userService.findSeller();
  }

  @MessagePattern({ cmd: 'delete_user' })
  async removeUser(id: number) {
    return this.userService.removeUser(id);
  }

  @MessagePattern({ cmd: 'delete_seller' })
  async removeSeller(id: number) {
    return this.userService.removeSeller(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
