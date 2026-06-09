import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { DestinationModule } from './destination/destination.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    CategoryModule,
    DestinationModule,
    ReviewModule,
    UserModule,
  ],
})
export class AppModule {}
