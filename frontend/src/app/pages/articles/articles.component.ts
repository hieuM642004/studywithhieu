import { Component, OnInit } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticlesService } from '../../services/articles.service';
import { Articles,PaginatedArticles } from '../../types/types';
import { User } from '../../types/types';
import { UsersService } from '../../services/user.service';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {

  data: Articles[] = [];
  users: User[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 5;
  totalPagesArray:number[]=[]
  constructor(private articlesService: ArticlesService, private usersService: UsersService) {}

  ngOnInit(): void {
  
    this.fetchArticles(this.currentPage, this.pageSize);
    this.totalPagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  fetchArticles(page: number, limit: number) {
    this.articlesService.getArticles(page, limit).subscribe((articlesData: PaginatedArticles) => {
      if (articlesData && articlesData.data && Array.isArray(articlesData.data.data)) {
        this.data = articlesData.data.data;
        this.totalPages = articlesData.data.totalPages;
        this.currentPage = Number(articlesData.data.currentPage);
        this.totalItems = articlesData.data.totalItems;
        this.totalPagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
      } else {
        console.error('Data from articles not formatted');
      }
    });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.fetchArticles(page, this.pageSize);
    }
  }
  shareOnTwitter(article: any) {
    // Truy xuất ảnh từ bài viết
    const imageUrl = article.images && article.images.length > 0 ? article.images[0] : '';
  
    // URL của trang web
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent('http://localhost:4200/articles/' + article.slug)}&text=${encodeURIComponent(article.title)}&hashtags=${encodeURIComponent('podcast')}`;
  
    // Thêm thẻ meta cho ảnh
    const metaImage = document.createElement('meta');
    metaImage.setAttribute('property', 'og:image');
    metaImage.setAttribute('content', imageUrl);
    document.head.appendChild(metaImage);

    window.open(url, '_blank');
  }
  
 
}

