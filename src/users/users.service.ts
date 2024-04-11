import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(private readonly dataSource: DataSource) { }

  async register(createUserDto: CreateUserDto): Promise<Users> {
    const { id_professor, username, password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await this.dataSource.query(
      `INSERT INTO users (id_professor, username, password) VALUES (?, ?, ?)`,
      [id_professor, username, hashedPassword]
    );

    const id = result.insertId;

    const user = await this.dataSource.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<Users> {
    const { username, password } = loginUserDto;

    const [user] = await this.dataSource.query(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new NotFoundException('Invalid credentials');
    }

    return user;
  }

  async logout(userId: number): Promise<void> {
    // Implementar lógica de cierre de sesión
  }
  async updatePassword(userId: number, updateUsersDto: UpdateUserDto): Promise<Users> {
    const { password, last_password } = updateUsersDto;

    if (!last_password || !password) {
      throw new BadRequestException('Invalid password');
    }

    const pwd = await this.dataSource.query('select password from users where id = ?', [userId]);

    if (!pwd || !pwd[0] || !pwd[0].password) {
      throw new NotFoundException('User or password not found');
    }

    const matchPassword = await bcrypt.compare(last_password, pwd[0].password);
    if (!matchPassword) {
      throw new BadRequestException(`Password doesn't match with the last one.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.dataSource.query(
      `UPDATE users SET password = ? WHERE id = ?`,
      [hashedPassword, userId]
    );

    const response = await this.findOne(userId);

    return response;
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.dataSource.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
  async findAll(): Promise<Users[]> {
    const users = await this.dataSource.query(
      `SELECT id, id_professor, username FROM users`,
    );

    if (!users) {
      throw new NotFoundException(`No users found.`);
    }

    return users;
  }
} 