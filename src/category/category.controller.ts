import {
  Controller,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { pagination } from 'src/interface/pagination';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern({ cmd: 'get_category' })
  async findAll(pagination: pagination) {
    return this.categoryService.findAll(pagination);
  }

  @MessagePattern({ cmd: 'update_category' })
  async update(updateCategoryDto: UpdateCategoryDto) {
    console.log(updateCategoryDto);
    return this.categoryService.update(
      updateCategoryDto.id,
      updateCategoryDto.name,
    );
  }

  @MessagePattern({ cmd: 'add_category' })
  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoryService.update(+id, updateCategoryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  @MessagePattern({cmd:'relation'})
  async findRelation(){
    return this.categoryService.findRelation();
  }
}
