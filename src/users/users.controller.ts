// src/user/user.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
/* @UseGuards(AuthGuard('jwt'), RolesGuard) */
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('userEmail')
  findByEmail(@Body('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
