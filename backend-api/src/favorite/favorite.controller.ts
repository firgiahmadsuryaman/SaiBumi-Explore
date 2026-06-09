import {
  Controller,
  Get,
  Post,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post('toggle/:destinationId')
  async toggle(
    @Request() req: any,
    @Param('destinationId') destinationId: string,
  ) {
    return this.favoriteService.toggleFavorite(req.user.userId, destinationId);
  }

  @Get()
  async getFavorites(@Request() req: any) {
    return this.favoriteService.getFavorites(req.user.userId);
  }

  @Get('status/:destinationId')
  async checkStatus(
    @Request() req: any,
    @Param('destinationId') destinationId: string,
  ) {
    return this.favoriteService.checkFavoriteStatus(
      req.user.userId,
      destinationId,
    );
  }
}
