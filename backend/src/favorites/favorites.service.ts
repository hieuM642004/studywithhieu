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
      const articlesString = favoritesDto.idArticle.join(',');
      const articlesArray = articlesString
        .split(',')
        .map((quizz) => quizz.trim());
      const newFavorites = new this.favoritesModel({
        idUser: favoritesDto.idUser,
        idArticle: articlesArray, 
      });
  
     
     
  
      return newFavorites.save();
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

  async updateById(id: string, favorites: Favorites): Promise<Favorites> {
    const quizzesString = favorites.idArticle.join(',');
    const quizzesArray = quizzesString
      .split(',')
      .map((option) => option.trim());
    return await this.favoritesModel.findByIdAndUpdate(
      id,
      {
        idUser: favorites.idUser,
        idArticle: quizzesArray,
       
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }

  async deleteById(id: string): Promise<Favorites> {
    return await this.favoritesModel.findByIdAndDelete(id);
  }
}
