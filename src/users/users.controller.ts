import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  async createUser(@Body('name') name: string) {
    return this.usersService.createUser(name);
  }

  @Get()
  async getAllUsers() {
    console.log('GET /users called');
    return this.usersService.getAllUsers();
  }
}
