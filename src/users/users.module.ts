// user.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { ProfessorsModule } from '@/professors/professors.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProfessorsModule),
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
