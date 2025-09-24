// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Student } from '../students/students.entity';
import { Professor } from '../professors/professors.entity';
import { userRoleEnum } from '@/common/enums/user-role-enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: userRoleEnum,
    default: userRoleEnum.ADMIN,
  })
  userRole: userRoleEnum;

  @Column({ unique: true })
  email: string;

  @Column({ default: '8326664444' })
  phone: string;
  // optional backrefs (not required unless needed)
  @OneToOne(() => Student, (student) => student.user)
  student: Student;

  @OneToOne(() => Professor, (professor) => professor.user)
  professor: Professor;
}
