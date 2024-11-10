// user/user.controller.ts
import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import User from './entities/user.entity';



@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() data: Partial<User>): Promise<User> {
    return this.userService.createUser(data);
  }

  @Put(':id')
  async editUser(@Param('id') id: number, @Body() data: Partial<User>): Promise<User> {
    return this.userService.editUser(id, data);
  }
}