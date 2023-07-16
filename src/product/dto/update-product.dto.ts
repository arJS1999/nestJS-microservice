import { Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, Matches, Max, Min } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty({ message: 'Product Should have a name' })
  @Matches(/^[A-Za-z0-9 ]+$/, {
    message: 'Product name contains only alphanumeric',
  })
  name: string;

  @IsNotEmpty({ message: 'Product Should have a price' })
  @Type(() => Number)
  @IsNumber()
  @Min(99)
  @Max(15000)
  price: number;

  @IsNotEmpty({ message: 'Product Should have a CategoryId' })
  @IsIn(['1', '2', '3', '10'])
  product: number;
}

export class UpdateProductParamDto {
  @Type(() => Number)
  @IsNumber()
  id: number;
}
