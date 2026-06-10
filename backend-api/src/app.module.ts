import { Module } from '@nestjs/common';
// reload trigger comment
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { DestinationModule } from './destination/destination.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CategoryModule,
    DestinationModule,
    ReviewModule,
    UserModule,
    FavoriteModule,
  ],
})
export class AppModule {}
