import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async findAll(rating?: number, destinationId?: string) {
    const whereClause: any = {};

    if (rating) {
      whereClause.rating = Number(rating);
    }

    if (destinationId) {
      whereClause.destinationId = destinationId;
    }

    const reviews = await this.prisma.review.findMany({
      where: whereClause,
      include: {
        destination: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return reviews.map((r) => ({
      id: r.id,
      user: {
        name: r.userName,
        avatar: r.userAvatar,
        email: r.userEmail,
      },
      destinationId: r.destinationId,
      destinationName: r.destination.name,
      rating: r.rating,
      comment: r.comment,
      date: r.createdAt.toISOString().split('T')[0],
    }));
  }

  async delete(id: string) {
    await this.prisma.review.delete({
      where: { id },
    });
    return { success: true, message: 'Ulasan berhasil dihapus' };
  }
}
