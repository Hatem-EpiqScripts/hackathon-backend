import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProfessorsService } from './professors.service';
import { Professor } from './professors.entity';
import { Param } from '@nestjs/common';
import { CreateProfessorDto } from './dto/create.professor.dto';
import { findProfessorDTO } from './dto/findProfessor.dto';
@Controller('professors')
export class ProfessorsController {
  constructor(private readonly professorsService: ProfessorsService) {}

  @Get()
  findAll(): Promise<Professor[]> {
    return this.professorsService.findAll();
  }

  @Get(':userId')
  findOneByUserId(@Param('userId') userId: number): Promise<Professor | null> {
    return this.professorsService.findprofessorByUserId(userId);
  }

  @Post()
  create(@Body() dto: CreateProfessorDto): Promise<Professor> {
    return this.professorsService.create(dto.userId);
  }
}
