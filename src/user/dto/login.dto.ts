import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'User Should have a email' })
  @IsEmail()
  @Length(15, 50)
  email: string;

  @IsNotEmpty({ message: 'User Should have a password' })
  @Length(6, 50)
  password: string;
}
