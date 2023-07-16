import { IsAlpha, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Category Should have a name' })
  @IsAlpha()
  name: string;
}
