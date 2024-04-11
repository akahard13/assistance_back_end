import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateClassScheduleDto {
    @IsNumber()
    @IsNotEmpty()
    id_group: number;

    @IsNumber()
    @IsNotEmpty()
    id_classroom: number;

    @IsString()
    @IsNotEmpty()
    time_class: string;

    @IsString()
    @IsNotEmpty()
    day_class: string;
}
