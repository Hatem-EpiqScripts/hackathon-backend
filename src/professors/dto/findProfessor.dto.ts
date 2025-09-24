import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class findProfessorDTO {
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
