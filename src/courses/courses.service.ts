import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './courses.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { Professor } from '../professors/professors.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(Professor)
    private readonly profRepo: Repository<Professor>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    const { professorId, name, code, description } = createCourseDto;

    if (!professorId) throw new BadRequestException('professorId is required');

    // make sure professor exists
    const professor = await this.profRepo.findOne({
      where: { id: professorId },
    });
    if (!professor) throw new NotFoundException('Professor not found');

    const course = this.coursesRepository.create({
      name,
      code,
      description,
      professor,
    });
    return this.coursesRepository.save(course);
  }

  findAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  findOne(id: number): Promise<Course | null> {
    return this.coursesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.coursesRepository.delete(id);
  }
}
