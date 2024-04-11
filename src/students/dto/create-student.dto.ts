import { IsNotEmpty, IsEmail, IsNumberString, IsOptional } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  carnet: string;

  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumberString()
  cellphone: string;

  @IsNotEmpty()
  grade: number;
  
  encoding: string;
}
