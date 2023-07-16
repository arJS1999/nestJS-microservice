import { Type } from 'class-transformer';
import {  IsIn, IsNotEmpty,  IsNumber,  Matches,  Max,  Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Product Should have a name' })
  @Matches(/^[A-Za-z ]+$/,{message:'name contains only letters'})
  name: string;


  @IsNotEmpty({ message: 'Product Should have a price' })
  @Type(() => Number)
  @IsNumber()
  @Min(99)
  @Max(10000)
  price:number


  @IsNotEmpty({ message: 'Product Should have a CategoryId' })
  @IsIn(['1','2','3','10'])
  product:number
}
