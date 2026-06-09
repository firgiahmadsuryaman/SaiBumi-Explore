import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (
      user &&
      user.status === 'ACTIVE' &&
      (await bcrypt.compare(pass, user.password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
    };
  }

  async changePassword(userId: string, oldPass: string, newPass: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !(await bcrypt.compare(oldPass, user.password))) {
      throw new UnauthorizedException('Kata sandi lama tidak cocok');
    }

    const hashedNewPassword = await bcrypt.hash(newPass, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });

    return { message: 'Kata sandi berhasil diperbarui' };
  }

  async updateProfile(
    userId: string,
    data: {
      name?: string;
      email?: string;
      avatar?: string;
      phoneNumber?: string;
    },
  ) {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data,
    });
    const { password, ...result } = updated;
    return result;
  }

  async register(data: any) {
    const { name, email, password, phoneNumber } = data;
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      throw new UnauthorizedException('Email sudah terdaftar');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        role: 'USER',
        status: 'ACTIVE',
      },
    });
    const { password: _, ...result } = user;
    return this.login(result);
  }
}
