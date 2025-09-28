import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    let token: string | undefined;

    // 1. Check cookie first
    if (request.cookies?.token) {
      token = request.cookies.token;
    }

    // 2. If no cookie, fall back to Authorization header
    if (!token) {
      const authHeader = request.headers.authorization;
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    //console.log('Resolved token:', token);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      request.user = {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
        username: payload.username,
      };

      return true;
    } catch (error) {
      console.error('JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
