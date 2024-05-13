import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesSchema } from './schemas/favorites.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule,MongooseModule.forFeature([{ name: 'Favorites', schema: FavoritesSchema }])],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
