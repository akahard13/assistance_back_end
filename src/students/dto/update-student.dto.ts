import { IsOptional, IsEmail, IsNumberString } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  fullname: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNumberString()
  cellphone: string;

  @IsOptional()
  grade: number;
}
