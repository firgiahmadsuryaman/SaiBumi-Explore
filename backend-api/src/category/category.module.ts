import { Module } from '@nestjs/common'; // wait, in NestJS it's @nestjs/common! Let's correct this.
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
