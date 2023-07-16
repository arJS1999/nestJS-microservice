import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Product Should have a name' })
  @Matches(/^[A-Za-z ]+$/, { message: 'name contains only letters' })
  name: string;

  @IsNotEmpty({ message: 'User Should have a email' })
  @IsEmail()
  @Length(15, 50)
  email: string;

  @IsNotEmpty({ message: 'User Should have a password' })
  @Length(6, 50)
  password: string;

  @IsNotEmpty({ message: 'User Should have a phone number' })
  @IsPhoneNumber('IN',{message:'Invalid phone number'})
  phone: string;
}
