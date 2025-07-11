import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user || user.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      acess_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(user: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }
    return this.usersService.create(user);
  }
}
