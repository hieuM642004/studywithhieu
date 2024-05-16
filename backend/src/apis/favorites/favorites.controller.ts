import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors, UploadedFiles,
  UseGuards,
  SetMetadata
} from '@nestjs/common';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { FavoritesService } from './favorites.service';
import { CreateFavoritesDto } from './dto/create-favorites.dto';
import { UpdateFavoritesDto } from './dto/update-favorites.dto';
import { Favorites } from './schemas/favorites.schema';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/authorization.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  // @UseGuards(AdminGuard)
  async getAllFavoritess(): Promise<ResponseData<Favorites[]>> {
    try {
      const favoritess = await this.favoritesService.findAll();
      return new ResponseData<Favorites[]>(favoritess, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Favorites[]>([], HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Post()
  async createFavorites(
    @Body() favoritesDto: CreateFavoritesDto,
  ): Promise<ResponseData<Favorites>> {
    try {
      const newFavorites = new Favorites();
    Object.assign(newFavorites, favoritesDto);
    

  
    const createdFavorites = await this.favoritesService.create(newFavorites);
      return new ResponseData<Favorites>(createdFavorites, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Favorites>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Get(':identifier')
  async getFavorites(
    @Param('identifier') identifier: string,
  ): Promise<ResponseData<Favorites>> {
    try {
      const foundFavorites = await this.favoritesService.findById(identifier);
      return new ResponseData<Favorites>(foundFavorites, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Favorites>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Put()
  async updateFavorites(
    @Body() favoritesDto: Favorites,
  ): Promise<ResponseData<Favorites>> {
    try {
      const updatedFavorites = new Favorites(); 
      Object.assign(updatedFavorites, favoritesDto); 

    
 
      const saveFavorites = await this.favoritesService.updateById(updatedFavorites);
      return new ResponseData<Favorites>(saveFavorites, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Favorites>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }

  @Delete(':id')
  async deleteFavorites(
    @Param('id') id: string,
  ): Promise<ResponseData<Favorites>> {
    try {
      const deletedFavorites = await this.favoritesService.deleteById(id);
      return new ResponseData<Favorites>(deletedFavorites, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Favorites>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  @Get(':id/count-likes')
  async countFavoritesByArticleId(
    @Param('id') id: string,
  ): Promise<ResponseData<number>> {
    try {
      const count = await this.favoritesService.countFavoritesByArticleId(id);
      return new ResponseData<number>(count, HttpStatus.SUCCESS,  HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<number>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
