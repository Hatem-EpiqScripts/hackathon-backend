import { SetMetadata } from '@nestjs/common';
import { userRoleEnum } from '@/common/enums/user-role-enum';
export const ROLES_KEY = 'roles';

export const Roles = (...roles: userRoleEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
