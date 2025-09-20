import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

import { userRoleEnum } from '@/common/enums/user-role-enum'; // ✅ with path alias

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(userRoleEnum)
  userRole: userRoleEnum;
}
