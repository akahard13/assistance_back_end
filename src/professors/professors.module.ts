import { Module } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { UsersService } from '../users/users.service';
@Module({
  controllers: [ProfessorsController],
  providers: [ProfessorsService, UsersService],
})
export class ProfessorsModule {}
