import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfessorDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  cellphone?: string;

  @IsOptional()
  isAdmin?: boolean;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
