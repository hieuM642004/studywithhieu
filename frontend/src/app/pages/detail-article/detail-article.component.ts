// Trong file detail-article.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Articles } from '../../types/types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent implements OnInit {
  article: Articles | undefined;
  slug: string;
  sameTopic: Articles[] = [];
  constructor(private articlesService: ArticlesService, private route: ActivatedRoute ) {
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
