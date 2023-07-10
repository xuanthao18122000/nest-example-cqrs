import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getListUser() {
    return await this.usersService.getAll();
  }

  @Post()
  async createUser() {
    return await this.usersService.create();
  }

  @Get(':id')
  async getDetailUser(@Param('id') id: number) {
    return await this.usersService.getOne(id);
  }

  @Put(':id')
  async updateUser() {
    return await this.usersService.update();
  }

  @Delete(':id')
  async deleteUser() {
    return await this.usersService.delete();
  }
}
