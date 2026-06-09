import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany({
      include: {
        _count: {
          select: { destinations: true },
        },
      },
      orderBy: { name: 'asc' },
    });

    return categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      totalDestinations: cat._count.destinations,
    }));
  }

  async create(name: string) {
    const existing = await this.prisma.category.findUnique({
      where: { name },
    });
    if (existing) {
      throw new ConflictException('Kategori dengan nama tersebut sudah ada');
    }

    const created = await this.prisma.category.create({
      data: { name },
    });

    return {
      id: created.id,
      name: created.name,
      totalDestinations: 0,
    };
  }

  async update(id: string, name: string) {
    const existing = await this.prisma.category.findUnique({
      where: { name },
    });
    if (existing && existing.id !== id) {
      throw new ConflictException('Kategori dengan nama tersebut sudah ada');
    }

    const updated = await this.prisma.category.update({
      where: { id },
      data: { name },
      include: {
        _count: {
          select: { destinations: true },
        },
      },
    });

    return {
      id: updated.id,
      name: updated.name,
      totalDestinations: updated._count.destinations,
    };
  }

  async delete(id: string) {
    await this.prisma.category.delete({
      where: { id },
    });
    return { success: true, message: 'Kategori berhasil dihapus' };
  }
}
