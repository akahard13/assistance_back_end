import { IsDate, IsString, IsNumber } from 'class-validator';

export class CreateClassGroupDto {
  @IsNumber()
  id_class: number;

  @IsNumber()
  id_professor: number;

  time_class;
  day_class;
  id_classroom;
}
