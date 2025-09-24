import {
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

import { userRoleEnum } from '@/common/enums/user-role-enum'; // ✅ with path alias

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  // @IsPhoneNumber()
  phone: string;
  @IsNotEmpty()
  @IsEnum(userRoleEnum, {
    message: 'Select your role',
  })
  userRole: userRoleEnum;
}
