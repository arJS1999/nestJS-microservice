import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { pagination } from '../interface/pagination';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'add_product' })
  async create(createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'update_product' })
  update(updateProductDto: UpdateProductDto) {
    console.log(updateProductDto);
    return this.productService.update(updateProductDto.id, updateProductDto);
  }

  @MessagePattern({ cmd: 'remove_product' })
  remove(id: number) {
    console.log(id);
    return this.productService.remove(id);
  }

  @MessagePattern({ cmd: 'get_product' })
  async findAll(pagination: pagination) {
    return this.productService.findAll(pagination);
  }

  @MessagePattern({ cmd: 'cart_product' })
  async findCart(productId) {
    console.log(productId);
    return this.productService.findCart(productId);
  }

  @MessagePattern('findOneProduct')
  findOne(@Payload() id: number) {
    return this.productService.findOne(id);
  }
}
