import { Module } from '@nestjs/common';
import { ClassGroupsService } from './class_groups.service';
import { ClassGroupController } from './class_groups.controller';
import { ClassScheduleService } from 'src/class_schedule/class_schedule.service';

@Module({
  controllers: [ClassGroupController],
  providers: [ClassGroupsService, ClassScheduleService],
})
export class ClassGroupsModule {}
