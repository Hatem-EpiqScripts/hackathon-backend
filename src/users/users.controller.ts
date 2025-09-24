// src/user/user.controller.ts
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { AuthGuard } from '@/auth/guards/auth.guards'; // or jwt-auth.guard.ts
import { RolesGuard } from '@/auth/guards/roles.guard';
import { userRoleEnum } from '@/common/enums/user-role-enum';
import { Roles } from '@/auth/guards/roles.decorator';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(userRoleEnum.ADMIN)
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /*  @Get('userEmail')
  findByEmail(@Body('email') email: string): Promise<User | null> {
    return this.userService.findByEmail(email);
  }
 */
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
