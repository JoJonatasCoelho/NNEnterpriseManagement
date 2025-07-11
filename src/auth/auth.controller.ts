import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, Roles } from './decorators';
import { Role } from './role.enum';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Public()
  @Post('login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    return this.authService.validateUser(user.email, user.password);
  }

  @HttpCode(200)
  @Public()
  @Post('register')
  async register(@Body() user: CreateUserDto): Promise<any> {
    return this.authService.register(user);
  }

  @Post('profile')
  @Roles(Role.Admin)
  getProfile(@Request() req): Promise<any> {
    return req.user;
  }
}
