import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlesService } from '../services/articles.service';
import { Articles } from '../types/types';
import { User } from '../types/types';
import { API_URL } from '../constant/api';
import { UsersService } from '../services/user.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports:[CommonModule,HttpClientModule,RouterModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {
  data: Articles[] = [];
  users: User[] = [];

  constructor(private articlesService: ArticlesService, private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchArticles(); 
  }

  fetchArticles() {
   
    this.articlesService.getArticles().subscribe((articlesData) => {
      if (articlesData && Array.isArray(articlesData.data)) {
        this.data = articlesData.data;

      
        this.usersService.getUsers().subscribe((usersData) => {
          if (usersData && Array.isArray(usersData.data)) {
            this.users = usersData.data;

           
            this.data.forEach((article) => {
              const postedById = article.postedBy;
              const user = this.users.find(user => user._id === postedById);
              if (user) {
             
                article.user = user;
              } else {
                console.error('Không tìm thấy người dùng cho bài viết:', article._id);
              }
            });
          } else {
            console.error('Dữ liệu trả về từ API người dùng không đúng định dạng');
          }
        });
      } else {
        console.error('Dữ liệu trả về từ API bài viết không đúng định dạng');
      }
    });
  }

}
