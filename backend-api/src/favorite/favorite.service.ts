import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private prisma: PrismaService) {}

  async toggleFavorite(userId: string, destinationId: string) {
    // Check if destination exists
    const destination = await this.prisma.destination.findUnique({
      where: { id: destinationId },
    });
    if (!destination) {
      throw new NotFoundException('Destinasi tidak ditemukan');
    }

    // Check if already favorited
    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_destinationId: {
          userId,
          destinationId,
        },
      },
    });

    if (existing) {
      await this.prisma.favorite.delete({
        where: {
          userId_destinationId: {
            userId,
            destinationId,
          },
        },
      });
      return { isFavorite: false, message: 'Dihapus dari favorit' };
    } else {
      await this.prisma.favorite.create({
        data: {
          userId,
          destinationId,
        },
      });
      return { isFavorite: true, message: 'Ditambahkan ke favorit' };
    }
  }

  async getFavorites(userId: string) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: {
        destination: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return favorites.map((fav: any) => fav.destination);
  }

  async checkFavoriteStatus(userId: string, destinationId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_destinationId: {
          userId,
          destinationId,
        },
      },
    });
    return { isFavorite: !!existing };
  }
}
