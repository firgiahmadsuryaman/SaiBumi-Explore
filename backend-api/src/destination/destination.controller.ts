import { Controller, Get, Post, Patch, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { DestinationService } from './destination.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('destinations')
export class DestinationController {
  constructor(private destinationService: DestinationService) {}

  @Get()
  async findAll(@Query('search') search?: string, @Query('category') category?: string) {
    return this.destinationService.findAll(search, category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.destinationService.findOne(id);
  }

  @Post()
  async create(@Body() data: any) {
    return this.destinationService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.destinationService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.destinationService.delete(id);
  }
}
