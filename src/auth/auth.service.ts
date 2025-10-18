import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) return null;

    const isValidPassword = await this.comparePassword(
      password,
      user?.passwordHash!,
    );
    if (!isValidPassword) return null;

    const { passwordHash, ...rest } = user;
    return rest;
  }

  signToken(id: number, email: string) {
    const payload = {
      sub: id,
      email
    }

    return this.jwtService.sign(payload)
  }
}
