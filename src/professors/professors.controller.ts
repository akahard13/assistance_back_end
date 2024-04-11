import { Controller, Get, Post, Body, Param, NotFoundException, Patch, Delete } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professors } from './entities/professor.entity';

@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Post()
  async create(@Body() createProfessorDto: CreateProfessorDto): Promise<Professors> {
    return this.professorsService.create(createProfessorDto);
  }

  @Get()
  async findAll(): Promise<Professors[]> {
    return this.professorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Professors> {
    const professor = await this.professorsService.findOne(+id);
    if (!professor) {
      throw new NotFoundException(`Professor with id ${id} not found`);
    }
    return professor;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProfessorDto: UpdateProfessorDto): Promise<Professors> {
    return this.professorsService.update(+id, updateProfessorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.professorsService.remove(+id);
  }
}
