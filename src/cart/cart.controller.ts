import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @MessagePattern({ cmd: 'add_cart' })
  create(createCartDto: CreateCartDto) {
    console.log(createCartDto);
    return this.cartService.create(createCartDto);
  }

  @MessagePattern({ cmd: 'list_cart' })
  async findAll(data) {
    return this.cartService.findAll(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.remove(+id);
  }
}
