import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/auth/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth('access-token')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  findAll() {
    return this.usersServices.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} user`;
  }
  @Post()
  @Public()
  create(@Body() user: CreateUserDto) {
    return this.usersServices.create(user);
  }
}
