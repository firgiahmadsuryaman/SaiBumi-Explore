import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Get()
  async findAll(
    @Query('rating') rating?: number,
    @Query('destinationId') destinationId?: string,
  ) {
    return this.reviewService.findAll(rating, destinationId);
  }

  @Get('my')
  async getMy(@Request() req: any) {
    return this.reviewService.getMyReviews(req.user.email);
  }

  @Post()
  async create(@Request() req: any, @Body() body: any) {
    return this.reviewService.create(req.user.userId, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
