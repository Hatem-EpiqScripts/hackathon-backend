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
import { UpdateCourseDto } from './dto/update-course.dto';
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

  async findAll(
    limit = 10,
    cursor?: number,
    code?: string,
  ): Promise<{ data: Course[]; nextCursor?: number }> {
    const query = this.coursesRepository
      .createQueryBuilder('course')
      .orderBy('course.id', 'ASC')
      .take(limit + 1); // fetch one extra to check if there's a next page

    if (cursor) {
      query.where('course.id >= :cursor', { cursor });
    }
    if (code?.trim()) {
      query.andWhere('course.code = :code', { code: code.trim() });
    }

    const results = await query.getMany();
    // console.log('i am in service', results);
    let nextCursor: number | undefined = undefined;
    if (results.length > limit) {
      const nextItem = results.pop(); // remove extra item
      nextCursor = nextItem!.id;
    }

    return { data: results, nextCursor };
  }

  findOne(id: number): Promise<Course | null> {
    return this.coursesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.coursesRepository.delete(id);
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    Object.assign(course, updateCourseDto);
    return this.coursesRepository.save(course);
  }
}
