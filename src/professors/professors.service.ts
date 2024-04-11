// professors.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { UpdateProfessorDto } from './dto/update-professor.dto';
import { Professors } from './entities/professor.entity';
import { UsersService } from '../users/users.service';
@Injectable()
export class ProfessorsService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService, // Inject UsersService
  ) { }

  async create(createProfessorDto: CreateProfessorDto): Promise<Professors> {
    const { fullname, email, cellphone, isAdmin, username, password } = createProfessorDto;
    const result = await this.dataSource.query(
      `INSERT INTO professors (fullname, email, cellphone, isAdmin, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
      [fullname, email, cellphone, isAdmin]
    );
    const id = result.insertId;
    //Logger.log(username, password);
    await this.usersService.register({
      "id_professor": id,
      "username": username,
      "password": password
    });
    const response = await this.dataSource.query(
      `SELECT p.*, u.username
      FROM professors p
      LEFT JOIN users u ON p.id = u.id_professor
      WHERE p.id = ?`,
      [id]
    );
    return response;
  }

  async findAll(): Promise<Professors[]> {
    const response = await this.dataSource.query(
      `SELECT p.*, u.username
       FROM professors p
       LEFT JOIN users u ON p.id = u.id_professor`
    );
    return response;
  }


  async findOne(id: number): Promise<Professors> {
    const professor = await this.dataSource.query(
      `SELECT p.*, u.username
      FROM professors p
      LEFT JOIN users u ON p.id = u.id_professor
      WHERE p.id = ?`,
      [id]
    );
    if (!professor) {
      throw new NotFoundException(`Professor with id ${id} not found`);
    }
    return professor;
  }

  async update(id: number, updateProfessorDto: UpdateProfessorDto): Promise<Professors> {
    const { fullname, email, cellphone, isAdmin } = updateProfessorDto;
    await this.dataSource.query(
      `UPDATE professors SET fullname = ?, email = ?, cellphone = ?, isAdmin = ? WHERE id = ?`,
      [fullname, email, cellphone, isAdmin, id]
    );
    const professor = await this.findOne(id);
    return professor;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure professor exists
    await this.dataSource.query(
      `DELETE FROM professors WHERE id = ?`,
      [id]
    );
  }
}
