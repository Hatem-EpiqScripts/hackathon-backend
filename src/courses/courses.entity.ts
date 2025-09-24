// src/courses/course.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Professor } from '../professors/professors.entity';
import { Enrollment } from '../enrollments/enrollments.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;

  @Column('text')
  description: string;

  @ManyToOne(() => Professor, (professor) => professor.courses)
  professor: Professor;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course)
  enrollments: Enrollment[];
}
