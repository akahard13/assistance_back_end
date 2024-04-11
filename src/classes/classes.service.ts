import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { DataSource } from 'typeorm';
import { Classes } from './entities/class.entity';
@Injectable()
export class ClassesService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createClassDto: CreateClassDto): Promise<Classes> {
    const { name, grade } = createClassDto;
    const result = await this.dataSource.query(
      `INSERT INTO classes (name, grade) VALUES (?, ?)`,
      [name, grade]
    );
    const id = result.insertId;
    const classe = await this.dataSource.query(
      `SELECT * FROM classes WHERE id = ?`,
      [id]
    );
    return classe;
  }

  async findAll(): Promise<Classes[]> {
    const classe = await this.dataSource.query(
      `SELECT * from classes`
    );
    return classe;
  }
  
  async findOne(id: number): Promise<Classes> {
    const classe = await this.dataSource.query(
      `SELECT * FROM classes
      WHERE id = ?`,
      [id]
    );
    if (!classe) {
      throw new NotFoundException('Student not found');
    }
    return classe;
  }
  
  async update(id: number, updateClassDto: UpdateClassDto): Promise<Classes> {
    const { name, grade } = updateClassDto;
    await this.dataSource.query(
      `UPDATE classes SET name = ?,  grade = ? WHERE id = ?`,
      [name, grade, id]
    );
    const updatedStudent = await this.findOne(id);
    return updatedStudent;
  }

  async remove(id: number): Promise<void> {
    const result = await this.dataSource.query(`DELETE FROM classes WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Student not found');
    }
  }
}
