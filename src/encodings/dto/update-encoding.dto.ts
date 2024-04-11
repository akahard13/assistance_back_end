import { IsOptional, IsString } from 'class-validator';

export class UpdateEncodingDto {
  @IsOptional()
  @IsString()
  name: string;
}
