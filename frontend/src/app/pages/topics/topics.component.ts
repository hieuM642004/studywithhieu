import { Component } from '@angular/core';
import { Articles, Topics } from '../../types/types';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { TopicsService } from '../../services/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})
export class TopicsComponent {
  
  slug: string;
  sameTopic: Topics | undefined;
  articles: Articles[] = [];
  constructor(
    private topicsService: TopicsService,
    private route: ActivatedRoute
  ) {
    this.slug = '';
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    if (this.slug) {
      this.fetchTopic(this.slug);
    } else {
      console.error('Slug not found in URL');
    }
  }

  fetchTopic(slug: string) {
    this.topicsService.getTopicsById(slug).subscribe(
      (responseData) => {
        this.sameTopic = responseData.data;
        console.log(responseData.data);
        
      if(this.sameTopic?.articles) {
        this.articles.push(...this.sameTopic.articles)
      }
      console.log(this.articles);
      
      },
      (error) => {
        console.error('Error fetching topic:', error);
      }
    );
  }
}
