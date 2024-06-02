import { Component, OnInit, ViewChild } from '@angular/core';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticlesService } from '../../services/articles.service';
import { Articles,PaginatedArticles } from '../../types/types';
import { User } from '../../types/types';
import { UsersService } from '../../services/user.service';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
import { ToastComponent } from '../../components/toast/toast.component';
@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
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
  onDeleteConfirmed(confirmed: boolean, articleId: string) {
    if (confirmed) {
      this.articlesService.deleteArticle(articleId).subscribe(() => {
        this.toastComponent.showToast('Article deleted successfully', 'success');
        setTimeout(() => {
          this.fetchArticles(this.currentPage, this.pageSize);
        }, 1000);
      }, error => {
        this.toastComponent.showToast('Failed to delete article', 'error');
        console.error('Failed to delete article:', error);
      });
    } else {
      console.log('User rejected deletion.');
    }
  }
  
  
 
}

