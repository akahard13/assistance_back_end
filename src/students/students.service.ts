import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Students } from './entities/student.entity';
import { EncodingsService } from 'src/encodings/encodings.service';

@Injectable()
export class StudentsService {
  constructor(private readonly dataSource: DataSource,
    private readonly encodingsService: EncodingsService) {}

  async create(createStudentDto: CreateStudentDto): Promise<Students> {
    const { carnet, fullname, email, cellphone, grade, encoding } = createStudentDto;
    const result = await this.dataSource.query(
      `INSERT INTO students (carnet, fullname, email, cellphone, grade, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [carnet, fullname, email, cellphone, grade]
    );
    //const id = result.insertId;
    await this.encodingsService.create({
      "id_student": carnet,
      "name": encoding
    });
    const student = await this.dataSource.query(
      `SELECT * FROM students WHERE carnet = ?`,
      [carnet]
    );
    return result;
  }

  async findAll(): Promise<Students[]> {
    const students = await this.dataSource.query(
      `SELECT students.*, encodings.id AS encoding_id, encodings.name AS encoding
      FROM students
      LEFT JOIN encodings ON students.carnet = encodings.id_student`
    );
    return students;
  }
  

  async findOne(carnet: string): Promise<Students> {
    const student = await this.dataSource.query(
      `SELECT students.*, encodings.id AS encoding_id, encodings.name AS encoding_name
      FROM students
      LEFT JOIN encodings ON students.carnet = encodings.id_student
      WHERE students.carnet = ?`,
      [carnet]
    );
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }
  

  async update(carnet: string, updateStudentDto: UpdateStudentDto): Promise<Students> {
    const { fullname, email, cellphone, grade } = updateStudentDto;
    await this.dataSource.query(
      `UPDATE students SET fullname = ?, email = ?, cellphone = ?, grade = ? WHERE carnet = ?`,
      [fullname, email, cellphone, grade, carnet]
    );
    const updatedStudent = await this.findOne(carnet);
    return updatedStudent;
  }

  async remove(carnet: string): Promise<void> {
    const result = await this.dataSource.query(`DELETE FROM students WHERE carnet = ?`, [carnet]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Student not found');
    }
  }
}
