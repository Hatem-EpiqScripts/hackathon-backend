import { SetMetadata, applyDecorators } from '@nestjs/common';
import { userRoleEnum } from '@/common/enums/user-role-enum';

export const ROLES_KEY = 'roles';
export const ROLES_MESSAGE_KEY = 'roles_message';

export function Roles(roles: userRoleEnum[], message?: string) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    SetMetadata(ROLES_MESSAGE_KEY, message),
  );
}
