import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { EncodingsService } from './encodings.service';
import { CreateEncodingDto } from './dto/create-encoding.dto';
import { UpdateEncodingDto } from './dto/update-encoding.dto';
import { Encodings } from './entities/encoding.entity';

@Controller('encodings')
export class EncodingsController {
  constructor(private readonly encodingService: EncodingsService) {}

  @Post()
  async create(@Body() createEncodingDto: CreateEncodingDto): Promise<Encodings> {
    return this.encodingService.create(createEncodingDto);
  }

  @Get()
  async findAll(): Promise<Encodings[]> {
    return this.encodingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Encodings> {
    return this.encodingService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateEncodingDto: UpdateEncodingDto): Promise<Encodings> {
    return this.encodingService.update(+id, updateEncodingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.encodingService.remove(+id);
  }
}
