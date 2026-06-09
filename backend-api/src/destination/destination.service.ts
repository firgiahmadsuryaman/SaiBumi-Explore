import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DestinationService {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string, categoryName?: string) {
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (categoryName) {
      whereClause.category = {
        name: categoryName,
      };
    }

    const destinations = await this.prisma.destination.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return destinations.map((d) => ({
      id: d.id,
      name: d.name,
      category: d.category.name,
      description: d.description,
      address: d.address,
      latitude: d.latitude,
      longitude: d.longitude,
      ticketPrice: d.ticketPrice,
      openTime: d.openTime,
      closeTime: d.closeTime,
      facilities: d.facilities,
      thumbnail: d.thumbnail,
      images: d.images,
      rating: d.rating,
      reviewsCount: d.reviewsCount,
      createdAt: d.createdAt.toISOString().split('T')[0],
    }));
  }

  async findOne(id: string) {
    const d = await this.prisma.destination.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!d) {
      throw new NotFoundException('Destinasi tidak ditemukan');
    }

    return {
      id: d.id,
      name: d.name,
      category: d.category.name,
      description: d.description,
      address: d.address,
      latitude: d.latitude,
      longitude: d.longitude,
      ticketPrice: d.ticketPrice,
      openTime: d.openTime,
      closeTime: d.closeTime,
      facilities: d.facilities,
      thumbnail: d.thumbnail,
      images: d.images,
      rating: d.rating,
      reviewsCount: d.reviewsCount,
      createdAt: d.createdAt.toISOString().split('T')[0],
    };
  }

  async create(data: any) {
    // Find category ID by name
    const category = await this.prisma.category.findUnique({
      where: { name: data.category },
    });

    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    const created = await this.prisma.destination.create({
      data: {
        name: data.name,
        categoryId: category.id,
        description: data.description,
        address: data.address,
        latitude: Number(data.latitude),
        longitude: Number(data.longitude),
        ticketPrice: Number(data.ticketPrice),
        openTime: data.openTime,
        closeTime: data.closeTime,
        facilities: data.facilities || [],
        thumbnail: data.thumbnail,
        images: data.images || [],
        rating: 0,
        reviewsCount: 0,
      },
      include: {
        category: true,
      },
    });

    return {
      ...created,
      category: created.category.name,
    };
  }

  async update(id: string, data: any) {
    const updateData: any = { ...data };

    if (data.category) {
      const category = await this.prisma.category.findUnique({
        where: { name: data.category },
      });
      if (!category) {
        throw new NotFoundException('Kategori tidak ditemukan');
      }
      updateData.categoryId = category.id;
      delete updateData.category;
    }

    if (data.latitude !== undefined) updateData.latitude = Number(data.latitude);
    if (data.longitude !== undefined) updateData.longitude = Number(data.longitude);
    if (data.ticketPrice !== undefined) updateData.ticketPrice = Number(data.ticketPrice);

    const updated = await this.prisma.destination.update({
      where: { id },
      data: updateData,
      include: {
        category: true,
      },
    });

    return {
      id: updated.id,
      name: updated.name,
      category: updated.category.name,
      description: updated.description,
      address: updated.address,
      latitude: updated.latitude,
      longitude: updated.longitude,
      ticketPrice: updated.ticketPrice,
      openTime: updated.openTime,
      closeTime: updated.closeTime,
      facilities: updated.facilities,
      thumbnail: updated.thumbnail,
      images: updated.images,
      rating: updated.rating,
      reviewsCount: updated.reviewsCount,
      createdAt: updated.createdAt.toISOString().split('T')[0],
    };
  }

  async delete(id: string) {
    await this.prisma.destination.delete({
      where: { id },
    });
    return { success: true, message: 'Destinasi berhasil dihapus' };
  }
}
