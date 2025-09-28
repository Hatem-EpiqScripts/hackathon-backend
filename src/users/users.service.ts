// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { ProfessorsService } from '@/professors/professors.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    // private readonly studentService: StudentService,
    private readonly professorService: ProfessorsService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
    //this returns the password as well. in real apllication, I'd use DTO response.
  }

  findByEmail(email: string): Promise<User | null> {
    const user = this.usersRepository.findOne({ where: { email } });

    return user;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    /*if (user.userRole === 'student') {
      await this.studentService.create({ userId: user.id });
    }*/
    const savedUser = await this.usersRepository.save(user);
    if (savedUser.userRole === 'professor') {
      await this.professorService.create(savedUser.id);
    }

    return savedUser;
  }
}
