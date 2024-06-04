import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Favorites } from './schemas/favorites.schema';
@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites.name)
    private favoritesModel: mongoose.Model<Favorites>,
  ) {}

  async findAll(): Promise<Favorites[]> {
    const favoritess = await this.favoritesModel.find();
    return favoritess;
  }

  async create(favoritesDto: Favorites): Promise<Favorites> {
    try {
     
      const existingFavorites = await this.favoritesModel.findOne({ idUser: favoritesDto.idUser });
  
      if (existingFavorites) {
       
        existingFavorites.idArticle.push(...favoritesDto.idArticle);
        return existingFavorites.save();
      } else {
     
        const newFavorites = new this.favoritesModel({
          idUser: favoritesDto.idUser,
          idArticle: favoritesDto.idArticle, 
        });
        return newFavorites.save();
      }
    } catch (error) {
      console.error('Error creating favorites:', error);
      throw error;
    }
  }
  
  

  async findById(identifier: string): Promise<Favorites> {
    let favorites: Favorites;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      favorites = await this.favoritesModel.findById(identifier);
    } else {
      favorites = await this.favoritesModel.findOne({ slug: identifier });
    }

    if (!favorites) {
      throw new NotFoundException('Favorites not found.');
    }

    return favorites;
  }

  async updateById(favorites: Favorites): Promise<Favorites> {
    try {
      const idUser = favorites.idUser;
      const quizzesString = favorites.idArticle.join(',');
      const quizzesArray = quizzesString
        .split(',')
        .map((option) => option.trim());
  
      return await this.favoritesModel.findOneAndUpdate(
        { idUser: idUser },
        {
          idArticle: quizzesArray,
        },
        {
          new: true,
          runValidators: true,
        },
      );
    } catch (error) {
      console.error('Error updating favorites:', error);
      throw error;
    }
  }
  

  async deleteById(id: string): Promise<Favorites> {
    return await this.favoritesModel.findByIdAndDelete(id);
  }

  async countFavoritesByArticleId(articleId: string): Promise<number> {
    return this.favoritesModel.countDocuments({ idArticle: articleId }).exec();
  }
}
