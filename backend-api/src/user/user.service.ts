import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      where: { role: 'USER' },
      orderBy: { joinDate: 'desc' },
    });

    return users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      avatar: u.avatar,
      role: u.role,
      status: u.status,
      joinDate: u.joinDate.toISOString().split('T')[0],
    }));
  }

  async updateStatus(id: string, status: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: { status },
    });

    const { password, ...result } = updated;
    return result;
  }
}
