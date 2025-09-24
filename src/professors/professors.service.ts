import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Professor } from './professors.entity';
import { User } from '../users/users.entity';

@Injectable()
export class ProfessorsService {
  constructor(
    @InjectRepository(Professor)
    private readonly profRepo: Repository<Professor>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findAll(): Promise<Professor[]> {
    return this.profRepo.find({ relations: ['user', 'courses'] });
  }

  async findprofessorByUserId(userId: number): Promise<Professor | null> {
    const professor = this.profRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!professor) {
      throw new NotFoundException(`Professor with userId ${userId} not found`);
    }

    return professor;
  }
  // Create a professor record for an existing user (userId)
  async create(userId: number): Promise<Professor> {
    if (!userId) throw new BadRequestException('userId is required');
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (user.userRole !== 'professor') {
      throw new BadRequestException('User is not a professor');
    }

    // prevent duplicate professor rows for same user
    const existing = await this.profRepo.findOne({
      where: { user: { id: userId } },
    });
    if (existing) throw new BadRequestException('Professor already exists');

    const prof = this.profRepo.create({ user });
    return this.profRepo.save(prof);
  }

  async remove(id: number): Promise<void> {
    await this.profRepo.delete(id);
  }
}
