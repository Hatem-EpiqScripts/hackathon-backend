import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { email: string; password: string };
type SignInData = { userId: number; email: string };
type AuthResult = { accessToken: string; userId: number; email: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authinticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }
  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findByEmail(input.email);

    if (user && user.password === input.password) {
      return { userId: user.id, email: user.email };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const payload = { sub: user.userId, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken, userId: user.userId, email: user.email };
  }
}
