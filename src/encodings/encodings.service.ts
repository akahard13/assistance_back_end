import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateEncodingDto } from './dto/create-encoding.dto';
import { UpdateEncodingDto } from './dto/update-encoding.dto';
import { Encodings } from './entities/encoding.entity';

@Injectable()
export class EncodingsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createEncodingDto: CreateEncodingDto): Promise<Encodings> {
    const { id_student, name } = createEncodingDto;
    const result = await this.dataSource.query(
      `INSERT INTO encodings (id_student, name, created_at) VALUES (?, ?, CURRENT_TIMESTAMP)`,
      [id_student, name]
    );
    const id = result.insertId;
    const encoding = await this.dataSource.query(
      `SELECT * FROM encodings WHERE id = ?`,
      [id]
    );
    return encoding[0];
  }

  async findAll(): Promise<Encodings[]> {
    return await this.dataSource.query(`SELECT * FROM encodings`);
  }

  async findOne(id: number): Promise<Encodings> {
    const [encoding] = await this.dataSource.query(`SELECT * FROM encodings WHERE id = ?`, [id]);
    if (!encoding) {
      throw new NotFoundException('Encoding not found');
    }
    return encoding;
  }

  async update(id: number, updateEncodingDto: UpdateEncodingDto): Promise<Encodings> {
    const { name } = updateEncodingDto;
    await this.dataSource.query(
      `UPDATE encodings SET name = ? WHERE id = ?`,
      [name, id]
    );
    const updatedEncoding = await this.findOne(id);
    return updatedEncoding;
  }

  async remove(id: number): Promise<void> {
    const result = await this.dataSource.query(`DELETE FROM encodings WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      throw new NotFoundException('Encoding not found');
    }
  }
}
