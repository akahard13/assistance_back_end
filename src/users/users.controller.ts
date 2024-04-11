import { Controller, Post, Body, Get, Param, NotFoundException, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Users } from './entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto)
  {

    const user = await this.usersService.login(loginUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const id:number= user.id;
    const token:string = this.generateToken(user); 
    return { id, token }; 
  }

  private generateToken(user: Users) {
    const payload = { username: user.username, sub: user.id }; 
    return jwt.sign(payload, 'secretKey', { expiresIn: '1h' });
  }

  @Post('logout')
  async logout(@Body() body: { userId: number }) {
    const { userId } = body;
    await this.usersService.logout(userId);
    return { message: 'Logout successful' };
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Users> {
    const user = await this.usersService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }
  @Patch(':id')
  async updatePassword(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<void> {
    await this.usersService.updatePassword(parseInt(id), updateUserDto);
  }
}
/*updated*/