import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorsService } from './professors.service';
import { ProfessorsController } from './professors.controller';
import { Professor } from './professors.entity';
import { User } from '../users/users.entity';
import { Course } from '../courses/courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professor, User, Course])],
  providers: [ProfessorsService],
  controllers: [ProfessorsController],
  exports: [ProfessorsService],
})
export class ProfessorsModule {}
