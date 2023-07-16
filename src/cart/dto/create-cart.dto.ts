import { IsNotEmpty, IsPositive, Length } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty({ message: 'Cart Should have a Product Id' })
  @IsPositive({ message: 'Product Id Should have a Positive Integer' })
  product_id: number;
}
