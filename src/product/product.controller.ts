import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Inject,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { Query, Res, UploadedFile, UsePipes } from '@nestjs/common/decorators';
import { ProductService } from './product.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtGuard } from 'src/auth/jwt-guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorators';
import { ClientProxy } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/Helper/file.helper';
import { CreateProductDto } from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductParamDto,
} from './dto/update-product.dto';

@Controller()
export class ProductController {
  constructor(
    @Inject('PRODUCT_MICROSERVICE')
    private readonly product_client: ClientProxy,
    private readonly productService: ProductService,
  ) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Get('get_product')
  getProduct(@Query('limit') limit: number, @Query('page') page: number) {
    return this.product_client.send({ cmd: 'get_product' }, { limit, page });
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('admin')
  @Get('get_category')
  getCategory(@Query('limit') limit: number, @Query('page') page: number) {
    return this.product_client.send({ cmd: 'get_category' }, { limit, page });
  }

  @Post('cart_product')
  cartProduct(@Body('product_id') product_id) {
    console.log(product_id);
    return this.product_client.send({ cmd: 'cart_product' }, { product_id });
  }

  @Post('update_category/:id')
  updateCategory(@Param('id') id: number, @Body('name') name: string) {
    return this.product_client.send({ cmd: 'update_category' }, { id, name });
  }

  @Post('add_category')
  @UsePipes(ValidationPipe)
  addCategory(@Body() categoryData: CreateCategoryDto) {
    const name: string = categoryData.name;
    return this.product_client.send({ cmd: 'add_category' }, { name });
  }

  @Delete('delete_product/:id')
  deleteProduct(@Param('id') id: number) {
    return this.product_client.send({ cmd: 'remove_product' }, { id });
  }

  @Post('add_product')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'src/Images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UsePipes(ValidationPipe)
  async addProduct(
    @UploadedFile() file,
    @Body() productData: CreateProductDto,
  ) {
    const response: any = {
      originalname: file.originalname,
      filename: file.filename,
    };
    const image = response.filename;
    console.log(image, productData);
    const price = productData.price;
    const name = productData.name;
    const product = productData.product;
    return this.product_client.send(
      { cmd: 'add_product' },
      { name, price, product, image },
    );
  }

  @Post('update_product/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'src/Images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @UsePipes(ValidationPipe)
  async updateProduct(
    @UploadedFile() file,
    @Body() productData: UpdateProductDto,
    @Param() productDataParam: UpdateProductParamDto,
  ) {
    const response: any = {
      originalname: file.originalname,
      filename: file.filename,
    };
    const image = response.filename;
    const price = productData.price;
    const product = productData.product;
    const name = productData.name;
    const id = productDataParam.id;

    console.log( image, price, product, name, id);
    return this.product_client.send(
      { cmd: 'update_product' },
      { name, price, product, image, id },
    );
  }

  @Get('Images/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: 'src/Images' });
  }

  @Get('relation')
  getRelation() {
    return this.product_client.send({ cmd: 'relation' }, {});
  }
}
