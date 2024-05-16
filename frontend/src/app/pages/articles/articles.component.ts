import { Component, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ArticlesService } from '../../services/articles.service';
import { Articles,PaginatedArticles } from '../../types/types';
import { User } from '../../types/types';
import { UsersService } from '../../services/user.service';
import { AuthInterceptor } from '../../services/interceptor/auth.interceptor';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}]
})
export class ArticlesComponent implements OnInit {

  data: Articles[] = [];
  users: User[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 10;
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
        this.fetchUsers();
        this.totalPagesArray = Array.from({length: this.totalPages}, (_, i) => i + 1);
      } else {
        console.error('Data from articles not formatted');
      }
    });
  }

  fetchUsers() {
    this.usersService.getUsers().subscribe((usersData) => {
      if (usersData && Array.isArray(usersData.data)) {
        this.users = usersData.data;
        this.attachUserToArticles();
      } else {
        console.error('Data from user not formatted');
      }
    });
  }

  attachUserToArticles() {
    this.data.forEach((article) => {
      const postedById = article.postedBy;
      const user = this.users.find(user => user._id === postedById);
      if (user) {
        article.user = user;
      } else {
        console.error('Not found user for article:', article._id);
      }
    });
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.fetchArticles(page, this.pageSize);
    }
  }
}

