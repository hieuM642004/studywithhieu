import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../../services/user.service';
import { User } from '../../types/types';
import { API_URL } from '../../constant/api';
import { CommonModule } from '@angular/common';
import { ArticlesService } from '../../services/articles.service';
import { Articles } from '../../types/types';
@Component({
  selector: 'app-detail-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss'
})
export class DetailUserComponent {
  user: User | undefined;
  slug: string;
  userArticles: Articles[] = []; // Array to store user's articles

  constructor(private usersService: UsersService, private route: ActivatedRoute, private articlesService: ArticlesService) {
    this.slug = '';
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    if (this.slug) {
      this.fetchUser(this.slug); 
    } else {
      console.error('Slug not found in URL');
    }
  }

  fetchUser(slug: string) {
    this.usersService.getUserById(slug).subscribe((responseData) => {
      this.user = responseData.data;
      console.log(responseData);
     
      this.fetchUserArticles();
    }, error => {
      console.error('Error fetching user:', error);
    });
  }

  fetchUserArticles() {
    if (this.user && this.user.articles && this.user.articles.length > 0) {
      
      this.user.articles.forEach(articleId => {
        
        this.articlesService.getArticlesById(articleId).subscribe((articleData) => {
         
          this.userArticles.push(articleData.data);
        }, error => {
          console.error('Error fetching article:', error);
        });
      });
    }
  }
}
