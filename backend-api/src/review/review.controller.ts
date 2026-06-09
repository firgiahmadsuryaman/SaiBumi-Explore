import { Controller, Get, Delete, Param, Query, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  async findAll(@Query('rating') rating?: number, @Query('destinationId') destinationId?: string) {
    return this.reviewService.findAll(rating, destinationId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
