// src/enrollments/enrollment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../students/students.entity';
import { Course } from '../courses/courses.entity';
import { EnrollmentStatus } from '@/common/enums/enrollment-status.enum';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.enrollments)
  student: Student;

  @ManyToOne(() => Course, (course) => course.enrollments)
  course: Course;

  @Column({ type: 'timestamp' })
  enrolled_at: Date;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ACTIVE,
  })
  @Column()
  status: EnrollmentStatus; // e.g., 'active', 'completed', etc.
}
