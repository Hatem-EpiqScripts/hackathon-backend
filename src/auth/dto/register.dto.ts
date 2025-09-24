import {
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsOptional,
  IsIn,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  //@Matches(/^\d{10}$/, { message: 'Phone must be a 10-digit number' })
  phone: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @ValidateIf((o) => o.confirmPassword !== undefined)
  @IsString({ message: 'Confirm Password must be a string' })
  confirmPassword: string;

  @IsOptional()
  @IsIn(['professor', 'student'], {
    message: 'select a valid role',
  })
  role?: 'professor' | 'user';
}
