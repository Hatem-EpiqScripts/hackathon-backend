import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { userRoleEnum } from '@/common/enums/user-role-enum';
type AuthInput = { email: string; password: string };
type SignInData = {
  userId: number;
  email: string;
  userRole: userRoleEnum;
  userName: string;
};
type AuthResult = {
  accessToken: string;
  userId: number;
  email: string;
  userRole: userRoleEnum;
  userName: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findByEmail(input.email);

    if (user && user.password === input.password) {
      return {
        userId: user.id,
        email: user.email,
        userRole: user.userRole,
        userName: user.userName,
      };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const dbUser = await this.userService.findByEmail(user.email);
    if (!dbUser) {
      throw new UnauthorizedException('User not found');
    }
    const payload = {
      sub: user.userId,
      email: user.email,
      username: user.userName,
      role: dbUser.userRole,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
      userId: user.userId,
      email: user.email,
      userName: user.userName,
      userRole: user.userRole,
    };
  }
}
