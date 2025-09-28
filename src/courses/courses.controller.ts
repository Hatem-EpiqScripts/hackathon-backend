import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './courses.entity';
import { AuthGuard } from '@/auth/guards/auth.guards';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { userRoleEnum } from '@/common/enums/user-role-enum';
import { Roles } from '@/auth/guards/roles.decorator';
import { Query } from '@nestjs/common';
import { error } from 'console';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([userRoleEnum.PROFESSOR], 'only professors can create courses')
  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    console.error('ERROR: ', error);
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  findAll(
    @Query('limit') limit?: string,
    @Query('cursor') cursor?: string,
    @Query('code') code?: string,
  ) {
    // console.log('I am in controller', limit, cursor);
    return this.coursesService.findAll(
      limit ? parseInt(limit, 10) : 10,
      cursor ? parseInt(cursor, 10) : undefined,
      code,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Course | null> {
    return this.coursesService.findOne(id);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([userRoleEnum.PROFESSOR], 'Only professors can delete courses')
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.coursesService.remove(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles([userRoleEnum.PROFESSOR], 'only professors can edit courses')
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return this.coursesService.update(id, updateCourseDto);
  }
}
