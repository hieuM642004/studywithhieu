import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Readable } from 'stream';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';
import { Episode } from './schemas/episode.schema';

@Injectable()
export class EpisodeService {
  private firebaseService: FirebaseService;
  constructor(
    @InjectModel(Episode.name)
    private episodeModel: mongoose.Model<Episode>,
  ) {
    this.firebaseService = new FirebaseService();
  }

  async findAll(): Promise<Episode[]> {
    const episodes = await this.episodeModel.find().exec();
  
    return episodes;
  }
  
  async create(
    episodeDto: Episode,
    audioFile: Express.Multer.File,
  ): Promise<Episode> {
    try {
      const audioUrl = await this.firebaseService.uploadAudioToFirebase(
        audioFile.buffer,
        audioFile.originalname,
        'episodes',
      );
  
      const newEpisode = new this.episodeModel({
        ...episodeDto,
        audioUrl: audioUrl,
      });
  
      return newEpisode.save();
    } catch (error) {
      console.error('Error creating episode:', error);
      throw error;
    }
  }
  

  async findById(identifier: string): Promise<Episode> {
    let episode: Episode;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      episode = await this.episodeModel.findById(identifier);
    } else {
      episode = await this.episodeModel.findOne({ slug: identifier });
    }
    if (!episode) {
      throw new NotFoundException('Episode not found.');
    }

    return episode;
  }

  async updateById(
    id: string,
    episodeDto: Episode,
    files: Express.Multer.File[],
  ): Promise<Episode> {
    try {
      const episode = await this.episodeModel.findById(id);
      if (!episode) {
        throw new NotFoundException('Episode not found.');
      }
  
      if (files && files.length > 0) {
       
        for (const file of files) {
        
          const audioName = file.originalname;
          const folderName = 'episodes'; 
  
          const audioUrl = await this.firebaseService.uploadAudioToFirebase(file.buffer, audioName, folderName);

          episode.audioUrl = audioUrl;
        }
      }
  
      
      episode.title = episodeDto.title;
      episode.description = episodeDto.description;
      episode.duration = episodeDto.duration;
  
      
      return await episode.save();
    } catch (error) {
      console.error('Error updating episode:', error);
      throw error;
    }
  }
  

  async deleteById(id: string): Promise<Episode> {
    const deletedEpisode = await this.episodeModel.findByIdAndDelete(id);

    return deletedEpisode;
  }
}
