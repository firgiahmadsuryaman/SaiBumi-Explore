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
    // Get review first to update destination rating afterwards
    const review = await this.prisma.review.findUnique({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException('Ulasan tidak ditemukan');
    }

    await this.prisma.review.delete({
      where: { id },
    });

    // Recalculate destination rating & reviewsCount
    const allReviews = await this.prisma.review.findMany({
      where: { destinationId: review.destinationId },
    });
    const reviewsCount = allReviews.length;
    const avgRating =
      reviewsCount > 0
        ? allReviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount
        : 0;

    await this.prisma.destination.update({
      where: { id: review.destinationId },
      data: {
        rating: parseFloat(avgRating.toFixed(1)),
        reviewsCount,
      },
    });

    return { success: true, message: 'Ulasan berhasil dihapus' };
  }

  async create(
    userId: string,
    data: { destinationId: string; rating: number; comment: string },
  ) {
    const { destinationId, rating, comment } = data;

    const destination = await this.prisma.destination.findUnique({
      where: { id: destinationId },
    });
    if (!destination) {
      throw new NotFoundException('Destinasi tidak ditemukan');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }

    const review = await this.prisma.review.create({
      data: {
        userName: user.name,
        userAvatar: user.avatar,
        userEmail: user.email,
        destinationId,
        rating: Number(rating),
        comment,
      },
    });

    // Recalculate destination rating & reviewsCount
    const allReviews = await this.prisma.review.findMany({
      where: { destinationId },
    });
    const reviewsCount = allReviews.length;
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount;

    await this.prisma.destination.update({
      where: { id: destinationId },
      data: {
        rating: parseFloat(avgRating.toFixed(1)),
        reviewsCount,
      },
    });

    return {
      id: review.id,
      user: {
        name: review.userName,
        avatar: review.userAvatar,
        email: review.userEmail,
      },
      destinationId: review.destinationId,
      destinationName: destination.name,
      rating: review.rating,
      comment: review.comment,
      date: review.createdAt.toISOString().split('T')[0],
    };
  }

  async getMyReviews(userEmail: string) {
    const reviews = await this.prisma.review.findMany({
      where: { userEmail },
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
}
