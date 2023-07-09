import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  getHello() {
    return this.UsersService.getAll();
  }
}
