import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Students } from './entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Students> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<Students[]> {
    return this.studentsService.findAll();
  }

  @Get(':carnet')
  async findOne(@Param('carnet') carnet: string): Promise<Students> {
    return this.studentsService.findOne(carnet);
  }

  @Put(':carnet')
  async update(@Param('carnet') carnet: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Students> {
    return this.studentsService.update(carnet, updateStudentDto);
  }

  @Delete(':carnet')
  async remove(@Param('carnet') carnet: string): Promise<void> {
    return this.studentsService.remove(carnet);
  }
}
