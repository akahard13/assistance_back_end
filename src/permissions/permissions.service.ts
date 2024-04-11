import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permissions } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permissions> {
    const { name, description } = createPermissionDto;
    const result = await this.dataSource.query(
      `INSERT INTO permissions (name, description) VALUES (?, ?)`,
      [name, description]
    );
    const id = result.insertId;
    const response = await this.dataSource.query(
      `SELECT * FROM permissions WHERE id = ?`,
      [id]
    );
    return response[0];
  }

  async findAll(): Promise<Permissions[]> {
    return this.dataSource.query(
      `SELECT * FROM permissions`
    );
  }

  async findOne(id: number): Promise<Permissions> {
    const permission = await this.dataSource.query(
      `SELECT * FROM permissions WHERE id = ?`,
      [id]
    );
    if (!permission[0]) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }
    return permission[0];
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto): Promise<Permissions> {
    const { name, description } = updatePermissionDto;
    await this.dataSource.query(
      `UPDATE permissions SET name = ?, description = ? WHERE id = ?`,
      [name, description, id]
    );
    const permission = await this.findOne(id);
    return permission;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Ensure permission exists
    await this.dataSource.query(
      `DELETE FROM permissions WHERE id = ?`,
      [id]
    );
  }
}
