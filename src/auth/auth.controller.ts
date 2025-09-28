import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthGuard } from './guards/auth.guards';
import { AuthService } from './auth.service';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() input: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, userId, email, userRole, userName } =
      await this.authService.authenticate(input);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { userId, email, role: userRole, username: userName };
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() req) {
    return req.user;
  }
}
