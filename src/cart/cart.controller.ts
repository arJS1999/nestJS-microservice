import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Inject,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtGuard } from 'src/auth/jwt-guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller()
export class CartController {
  constructor(
    @Inject('CART_MICROSERVICE')
    private readonly cart_client: ClientProxy,
  ) {}

  @UseGuards(JwtGuard)
  @UsePipes(ValidationPipe)
  @Post('add_cart')
  async addCart(@Body() cartData: CreateCartDto, @Request() req) {
    console.log(cartData, req.user);
    const user_id: number = req.user.id;
    const product_id:number=cartData.product_id
    console.log(user_id);
    return this.cart_client.send({ cmd: 'add_cart' }, { product_id, user_id });
  }

  @UseGuards(JwtGuard)
  @Get('list_cart')
  async listCart(@Request() req) {
    console.log(req.user.id);
    const userid = req.user.id;
    return this.cart_client.send({ cmd: 'list_cart' }, { userid });
  }
}
