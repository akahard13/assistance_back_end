import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { EncodingsService } from 'src/encodings/encodings.service';

@Module({
  controllers: [StudentsController],
  providers: [StudentsService, EncodingsService],
})
export class StudentsModule {}
