import { Injectable, Logger } from '@nestjs/common';
import { ClassGroup } from './entities/class_group.entity';
import { CreateClassGroupDto } from './dto/create-class_group.dto';
import { UpdateClassGroupDto } from './dto/update-class_group.dto';
import { DataSource } from 'typeorm';
import { ClassScheduleService } from 'src/class_schedule/class_schedule.service';

@Injectable()
export class ClassGroupsService {
  constructor(private dataSource: DataSource,
    private classScheduleService: ClassScheduleService) { }
  async create(createClassGroupDto: CreateClassGroupDto): Promise<ClassGroup> {
    const { id_class, id_professor, id_classroom, time_class, day_class } = createClassGroupDto;
    Logger.log(createClassGroupDto);
    const query = `
      INSERT INTO class_groups (id_professor, id_class)
      VALUES (?, ?)`;
    const values = [id_class, id_professor];
    const result = await this.dataSource.query(query, values);
    const id =result.insertId;
    if (id_classroom && time_class && day_class) {
      const classScheduleDto = {
        id_group: id,
        id_classroom,
        time_class,
        day_class,
      };
      await this.classScheduleService.create(classScheduleDto);
    }
    return result;
  }

  async findAll(): Promise<ClassGroup[]> {
    const query = `
      SELECT cg.*,
      c.name as clase,
      p.fullname
      FROM class_groups as cg
      JOIN classes as c on c.id = cg.id_class
      JOIN professors as p on p.id = cg.id_professor
    `;
    return this.dataSource.query(query);
  }

  async findOne(id: number): Promise<ClassGroup> {
    const query = `
      SELECT cg.*,
      c.name as clase,
      p.fullname
      FROM class_groups as cg
      JOIN classes as c on c.id = cg.id_class
      JOIN professors as p on p.id = cg.id_professor
      WHERE cg.id=?
    `;
    const values = [id];
    const result = await this.dataSource.query(query, values);
    return result[0];
  }

  async update(id: number, updateClassGroupDto: UpdateClassGroupDto): Promise<ClassGroup> {
    const { id_class, id_professor } = updateClassGroupDto;
    const query = `
      UPDATE class_groups
      SET id_class = ?, id_professor = ?
      WHERE id = ?`;
    const values = [id_class, id_professor, id];
    const result = await this.dataSource.query(query, values);
    return result[0];
  }

  async remove(id: number): Promise<void> {
    const query = 'DELETE FROM class_groups WHERE id = ?';
    const values = [id];
    await this.dataSource.query(query, values);
  }
}
