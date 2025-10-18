import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from '@prisma/client';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsersService
  ) {} 

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    const passwordHash = await this.auth.hashPassword(body.password);

    const user = await this.users.create({
      email: body.email,
      passwordHash,
      name: body.name ?? "",
    })

    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request & { user: User }) {
    const token = this.auth.signToken(req.user.id, req.user.email)
    return {user: req.user, accessToken: token}
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() req: Request & { user: User }) {
    const user = await this.users.findById(req.user.id)
    return user
  }
}
