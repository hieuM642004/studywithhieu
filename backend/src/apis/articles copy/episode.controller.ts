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
  SetMetadata,
  Query
  
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ResponseData } from 'src/global/globalClass';
import { HttpMessage, HttpStatus } from 'src/global/globalEnum';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/authorization.guard';
import { UpdateEpisodeDto } from './dto/update-episode.dto';
import { Episode } from './schemas/episode.schema';
import { CreateEpisodeDto } from './dto/create-episode.dto';
import { EpisodeService } from './episode.service';
@Controller('episodes')
export class EpisodeController  {
  constructor(private readonly episodeService: EpisodeService) {}
  @Get()
  // @UseGuards(AdminGuard)
  async getAllEpisodes(): Promise<ResponseData<Episode>> {
    try {
      const paginatedResult = await this.episodeService.findAll();
      return new ResponseData<Episode>(paginatedResult, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Episode>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  

  @Post()
  @UseInterceptors(FilesInterceptor('audio', 1))
  async createEpisode(
    @Body() episodeDto: CreateEpisodeDto, 
    @UploadedFiles() audioFile: Express.Multer.File[], 
  ): Promise<ResponseData<Episode>> {
    try {
      const newEpisode = new Episode(); 
      Object.assign(newEpisode, episodeDto);
      const saveEpisode = await this.episodeService.create(newEpisode, audioFile[0]);
      return new ResponseData<Episode>(saveEpisode, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Episode>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  


  @Get(':identifier')
  async getEpisode(
    @Param('identifier') identifier: string,
  ): Promise<ResponseData<Episode>> {
    try {
      const foundEpisode = await this.episodeService.findById(identifier);
      return new ResponseData<Episode>(foundEpisode, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Episode>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }


  @Put(':id')
  @UseInterceptors(FilesInterceptor('audio', 1))
  async updateEpisode(
    @Param('id') id: string,
    @Body() updateEpisodeDto: UpdateEpisodeDto, 
    @UploadedFiles() audioFiles: Express.Multer.File[], 
  ): Promise<ResponseData<Episode>> {
    try {
      // Tạo một instance của Episode từ updateEpisodeDto
      const updatedEpisode = new Episode(); 
      Object.assign(updatedEpisode, updateEpisodeDto); 
  
      // Gọi phương thức updateById của episodeService để cập nhật tập phim
      const savedEpisode = await this.episodeService.updateById(id, updatedEpisode, audioFiles);
      
      // Trả về dữ liệu phản hồi
      return new ResponseData<Episode>(savedEpisode, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      console.error('Error updating episode:', error);
      return new ResponseData<Episode>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
  

  @Delete(':id')
  async deleteEpisode(
    @Param('id') id: string,
  ): Promise<ResponseData<Episode>> {
    try {
      const deletedEpisode = await this.episodeService.deleteById(id);
      return new ResponseData<Episode>(deletedEpisode, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    } catch (error) {
      return new ResponseData<Episode>(null, HttpStatus.ERROR, HttpMessage.ERROR);
    }
  }
}
