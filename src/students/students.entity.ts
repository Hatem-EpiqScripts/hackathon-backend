import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Enrollment } from '../enrollments/enrollments.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  studentId: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  major: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.student)
  enrollments: Enrollment[];
}
