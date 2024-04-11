import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEncodingDto {
  @IsNotEmpty()
  id_student: string;

  @IsOptional()
  @IsString()
  name: string;
}
