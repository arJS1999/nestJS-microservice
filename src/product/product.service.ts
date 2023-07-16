import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { pagination } from '../interface/pagination';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const product = new Product();
    product.product_name = createProductDto.name;
    product.product_price = createProductDto.price;
    product.product_image = createProductDto.image;
    product.productId = createProductDto.product;

    return await this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = {
      product_name: updateProductDto.name,
      product_image: updateProductDto.image,
      product_price: updateProductDto.price,
      productId: updateProductDto.product,
    };
    return await this.productRepository.update(id, product);
  }

  async findCart(productId) {
    console.log(productId);
    const list = await this.productRepository.find({
      where: { id: In([productId.product_id]) },
    });
    return list;
  }

  async remove(id: number) {
    console.log(id);
    return await this.productRepository.delete(id);
  }

  async findAll(pagination: pagination) {
    console.log(pagination);
    return await this.productRepository.findAndCount({
      skip: pagination.page * pagination.limit,
      take: pagination.limit,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
