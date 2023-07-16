import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import dataSource from 'src/data-source';
import {  Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  create(createCartDto: CreateCartDto) {
    const cart = new Cart();
    cart.product_id = createCartDto.product_id;
    cart.user_id = createCartDto.user_id;
    cart.quantity = 1;
    return this.cartRepository.save(cart);
  }

  async findAll(data) {
    try {
      console.log(data)
      const user_id = data.userid;
      console.log(user_id);
      const cart: any = await this.cartRepository.find({
        select: { product_id: true, quantity: true },
        where: { user_id: user_id },
      });
      const product= cart.map((e) => {
        return e.product_id;
      });
      return { cart,product };
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
