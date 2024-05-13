// Trong file detail-article.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Articles } from '../../types/types';
import { ActivatedRoute } from '@angular/router';
import { API_URL } from '../../constant/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
@Component({
  selector: 'app-detail-article',
  standalone:true,
  imports:[CommonModule,ButtonModule,ToggleButtonModule,FormsModule],
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {
  article: Articles | undefined;
  slug: string;
  sameTopic: Articles[] = [];
  constructor(private articlesService: ArticlesService, private route: ActivatedRoute) {
    this.slug = '';
  }

  ngOnInit(): void {
    
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    if (this.slug) {
      this.fetchArticle(this.slug); 
    } else {
      console.error('Slug not found in URL');
    }
  }

  fetchArticle(slug: string) {
    this.articlesService.getArticlesById(slug).subscribe((responseData) => {
      this.article = responseData.data;
      console.log(responseData);
      
    }, error => {
      console.error('Error fetching article:', error);
    });
  }
}
