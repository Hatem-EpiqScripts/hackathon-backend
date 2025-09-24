import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './courses.entity';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Professor } from '@/professors/professors.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Course, Professor])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
export class CoursesModule {}
