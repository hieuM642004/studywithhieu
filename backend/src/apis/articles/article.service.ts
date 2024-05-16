import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Readable } from 'stream';
import { Article } from './schemas/article.schema';
import { GoogleDriveUploader } from 'src/providers/storage/drive/drive.upload';
import { User } from '../users/schemas/user.schema'; 
import { PaginatedResult } from './interface/pagination.interface';
import FirebaseService from 'src/providers/storage/firebase/firebase.service';
import { Topic } from '../topics/schemas/topic.schema';
import { Favorites } from '../favorites/schemas/favorites.schema';

@Injectable()
export class ArticleService {
  private firebaseService: FirebaseService;
  constructor(
    @InjectModel(Article.name)
    private articleModel: mongoose.Model<Article>,
    @InjectModel(Topic.name)
    private topicModel: mongoose.Model<Topic>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
    @InjectModel(Favorites.name)
    private favoritesModel: mongoose.Model<Favorites>,
    private readonly googleDriveUploader: GoogleDriveUploader,
  ) {
    this.firebaseService = new FirebaseService();
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
    searchQuery?: string,
  ): Promise<PaginatedResult<Article>> {
    let query = {};

    if (searchQuery) {
      query = { title: { $regex: searchQuery, $options: 'i' } };
    }

    const totalItems = await this.articleModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / limit);
    const startIndex = (page - 1) * limit;

    const articles = await this.articleModel
      .find(query)
      .skip(startIndex)
      .limit(limit)
      .exec();

    const result: PaginatedResult<Article> = {
      data: articles,
      totalPages: totalPages,
      currentPage: page,
      totalItems: totalItems,
    };
    return result;
  }

  async create(
    articleDto: Article,
    files: Express.Multer.File[],
  ): Promise<Article> {
    try {
      const imagesUrlPromises = files.map(async (file) => {
        const imageUrl = await this.firebaseService.uploadImageToFirebase(
          file.buffer,
          file.originalname,
          'articles',
        );
        return imageUrl;
      });
      const imagesUrl = await Promise.all(imagesUrlPromises);

      const newArticle = new this.articleModel({
        ...articleDto,
        images: imagesUrl,
      });
      await this.topicModel.findByIdAndUpdate(
        articleDto.idTopic,
        { $push: { articles: newArticle._id } },
        { new: true },
      );
      await this.userModel.findByIdAndUpdate(
        articleDto.postedBy,
        { $push: { articles: newArticle._id } },
        { new: true },
      );

      return newArticle.save();
    } catch (error) {
      console.error('Error creating article:', error);
      throw error;
    }
  }

  async findById(identifier: string): Promise<Article> {
    let article: Article;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      article = await this.articleModel.findById(identifier);
    } else {
      article = await this.articleModel.findOne({ slug: identifier });
    }
    if (!article) {
      throw new NotFoundException('Article not found.');
    }
    article.views += 1;
    await this.articleModel.findByIdAndUpdate(article._id, {
      views: article.views,
    });
    return article;
  }

  async updateById(
    id: string,
    articleDto: Article,
    files: Express.Multer.File[],
  ): Promise<Article> {
    try {
      const article = await this.articleModel.findById(id);
      if (!article) {
        throw new NotFoundException('Article not found.');
      }

      for (const imageUrl of article.images) {
        const fileId = this.googleDriveUploader.extractFileIdFromUrl(imageUrl);
        await this.googleDriveUploader.deleteImage(fileId);
      }

      const imagesUrlPromises = files.map(async (file) => {
        const fileStream = Readable.from(file.buffer);
        const fileId = await this.googleDriveUploader.uploadImage(
          fileStream,
          file.originalname,
          '1eHh70ah2l2JuqHQlA1riebJZiRS9L20q',
        );
        return this.googleDriveUploader.getThumbnailUrl(fileId);
      });
      const imagesUrl = await Promise.all(imagesUrlPromises);

      article.title = articleDto.title;
      article.content = articleDto.content;
      article.images = imagesUrl;
      article.idTopic = articleDto.idTopic;
      article.slug = articleDto.slug;
      article.episodes = articleDto.episodes;

      return await article.save();
    } catch (error) {
      console.error('Error updating article:', error);
      throw error;
    }
  }

  async deleteById(id: string): Promise<Article> {
    const deletedArticle = await this.articleModel.findByIdAndDelete(id);
    await this.userModel.updateOne(
      { articles: id },
      { $pull: { articles: id } },
    );
    await this.topicModel.updateOne(
      { articles: id },
      { $pull: { articles: id } },
    );
    await this.favoritesModel.updateOne(
      { idArticle: id },
      { $pull: { idArticle: id } },
    );
    return deletedArticle;
  }
}
