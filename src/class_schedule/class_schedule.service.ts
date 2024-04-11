import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateClassScheduleDto } from './dto/create-class_schedule.dto';
import { UpdateClassScheduleDto } from './dto/update-class_schedule.dto';
import { DataSource } from 'typeorm';
import { throwError } from 'rxjs';
@Injectable()
export class ClassScheduleService {
  constructor(private dataSource: DataSource) { }
  async create(createClassScheduleDto: CreateClassScheduleDto) {
    const { id_group, id_classroom, time_class, day_class } = createClassScheduleDto;

    const idClassrooms = Array.isArray(id_classroom) ? id_classroom : [id_classroom];
    const times = Array.isArray(time_class) ? time_class : [time_class];
    const days = Array.isArray(day_class) ? day_class : [day_class];

    if (idClassrooms.length !== times.length || idClassrooms.length !== days.length) {
      throw new Error('Arrays have different lengths');
    }

    const responses = [];
    for (let i = 0; i < idClassrooms.length; i++) {
      const query = `
        INSERT INTO class_schedule (id_group, id_classroom, time_class, day_class)
        VALUES (?, ?, ?, ?)`;
      const values = [id_group, idClassrooms[i], times[i], days[i]];
      Logger.log(values);
      const response = await this.dataSource.query(query, values);
      responses.push(response);
    }
    return responses;
  }
  async findAll() {
    const query = `
    SELECT
    cg.*,
    c.name as clase,
    c.grade as anyo,
    p.fullname as profesor,
    cs.day_class,
    cs.time_class,
    cl.name as aula
  FROM
    class_groups as cg
    JOIN classes as c on c.id=cg.id_class
    JOIN professors p on cg.id_professor = p.id
    JOIN class_schedule cs on cg.id = cs.id_group
    JOIN classrooms cl on cs.id_classroom = cl.id
    `;
    const response = await this.dataSource.query(query);
    return response;
  }

  async findOne(id: number) {
    const query = `SELECT
    cg.*,
    c.name as clase,
    c.grade as anyo,
    p.fullname as profesor,
    cs.day_class,
    cs.time_class,
    cl.name as aula
  FROM
    class_groups as cg
    JOIN classes as c on c.id=cg.id_class
    JOIN professors p on cg.id_professor = p.id
    JOIN class_schedule cs on cg.id = cs.id_group
    JOIN classrooms cl on cs.id_classroom = cl.id
    WHERE cg.id=?
    `;
    const response = await this.dataSource.query(query, [id]);
    return response;
  }

  async update(id: number, updateClassScheduleDto: UpdateClassScheduleDto) {
    return `This action updates a #${id} classSchedule`;
  }

  async remove(id: number) {
    return `This action removes a #${id} classSchedule`;
  }
}
