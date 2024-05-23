import { Component, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Articles, PaginatedArticles } from '../../types/types';
import { User } from '../../types/types';
import { UsersService } from '../../services/user.service';
import { AuthInterceptor } from '../../interceptor/auth.interceptor';
import {TruncatePipe} from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-populer-detail-by-views',
  standalone: true,
  imports: [CommonModule, RouterModule,TruncatePipe],
  templateUrl: './populer-detail-by-views.component.html',
  styleUrl: './populer-detail-by-views.component.scss'
})
export class PopulerDetailByViewsComponent implements OnInit {
    data: Articles[] = [];
    users: User[] = [];
    totalPages: number = 0;
    currentPage: number = 1;
    totalItems: number = 0;
    pageSize: number = 10;
    totalPagesArray: number[] = [];
    topItems: Articles[] = [];
    topUser: User[] = [];
  
    constructor(private articlesService: ArticlesService, private usersService: UsersService) {}
  
    ngOnInit(): void {
      this.fetchArticles(this.currentPage, this.pageSize);
    }
  
    fetchArticles(page: number, limit: number) {
      this.articlesService.getArticles(page, limit).subscribe((articlesData: PaginatedArticles) => {
        if (articlesData && articlesData.data && Array.isArray(articlesData.data.data)) {
          this.data = articlesData.data.data;
          this.totalPages = articlesData.data.totalPages;
          this.currentPage = Number(articlesData.data.currentPage);
          this.totalItems = articlesData.data.totalItems;
          this.fetchUsers();
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.setTopItems();
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
  
    setTopItems() {
      this.topItems = this.data.sort((a, b) => b.views - a.views);
    }
    // setTopUser() {
    //   this.topUser = this.user.sort((a, b) => b.followers - a.followers).slice(0, 4);
    // }
  
  
    onPageChange(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.fetchArticles(page, this.pageSize);
      }
    }
}
