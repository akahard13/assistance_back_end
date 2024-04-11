import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateClassroomDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}