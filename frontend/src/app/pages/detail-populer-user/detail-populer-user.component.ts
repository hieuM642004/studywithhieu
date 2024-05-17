import { Component, OnInit } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Articles, PaginatedArticles } from '../../types/types';
import { User } from '../../types/types';
import { UsersService } from '../../services/user.service';
import { AuthInterceptor } from '../../services/interceptor/auth.interceptor';
import {TruncatePipe} from '../../pipes/truncate.pipe';


@Component({
  selector: 'app-detail-populer-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-populer-user.component.html',
  styleUrl: './detail-populer-user.component.scss'
})
export class DetailPopulerUserComponent implements OnInit {
    topUser: User[] = [];
    constructor( private usersService: UsersService) {}
  
    ngOnInit(): void {
    //   this.fetchArticles(this.currentPage, this.pageSize);
        this.setTopUsers();
    }
    setTopUsers(): void {
      this.usersService.getUsers().subscribe(usersData => {
        if (usersData && Array.isArray(usersData.data)) {
          this.topUser = usersData.data
            .sort((a, b) => (b.followers?.length || 0) - (a.followers?.length || 0));
        } else {
          console.error('Data from users not formatted correctly');
        }
      });
    }
  
}
