import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Inject,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from 'src/auth/jwt-guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorators';
import { CreateSellerDto } from './dto/create-seller.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
// @UseGuards(JwtGuard)
export class UserController {
  constructor(
    @Inject('USER_MICROSERVICE') private readonly user_client: ClientProxy,
    private readonly userService: UserService,
  ) {}

  @Post('register_user')
  @UsePipes(ValidationPipe)
  registerUser(@Body() userData: CreateUserDto) {
    const name = userData.name;
    const email = userData.email;
    const password = userData.password;
    const phone = userData.phone;

    return this.user_client.send(
      { cmd: 'register_user' },
      { name, email, password, phone },
    );
  }

  @Post('register_seller')
  @UsePipes(ValidationPipe)
  registerSeller(@Body() sellerData: CreateSellerDto) {
    const name = sellerData.name;
    const email = sellerData.email;
    const password = sellerData.password;
    const phone = sellerData.phone;
    return this.user_client.send(
      { cmd: 'register_seller' },
      { name, email, password, phone },
    );
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  loginUser(@Body() loginData: LoginDto) {
    const email = loginData.email;
    const password = loginData.password;

    return this.user_client.send({ cmd: 'login' }, { email, password });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Get('get_user')
  getUser() {
    return this.user_client.send({ cmd: 'get_user' }, {});
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Get('get_seller')
  getSeller() {
    return this.user_client.send({ cmd: 'get_seller' }, {});
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete_user/:id')
  deleteUser(@Param('id') id: number) {
    console.log(id);
    return this.user_client.send({ cmd: 'delete_user' }, { id });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Delete('delete_seller/:id')
  deleteSeller(@Param('id') id: number) {
    return this.user_client.send({ cmd: 'delete_seller' }, { id });
  }
}
