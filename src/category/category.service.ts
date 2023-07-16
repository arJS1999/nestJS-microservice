import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category();
    category.category_name = createCategoryDto.name;
    return await this.categoryRepository.save(category);
  }

  async findAll(pagination) {
    return await this.categoryRepository.findAndCount({
      skip: pagination.page * pagination.limit,
      take: pagination.limit,
    });
  }

  async update(id: number, name: string) {
    const bodyData = {
      category_name: name,
    };
    return await this.categoryRepository.update(id, bodyData);
  }

  async findRelation() {
    return await this.categoryRepository.find({ relations: ['categoryid'] });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }
}
