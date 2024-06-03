import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  articles: any[] = [];
  chartData: any;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.getTopArticles();
  }

  getTopArticles(): void {
    this.articlesService.getTopArticles().subscribe((article: any) => {
      this.articles = article.data;
      this.generateChartData();
    });
  }

  generateChartData(): void {
    const data = this.articles.map((article) => article.views);
    const labels = this.articles.map((article) => article.title);

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Views',
          data: data,
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
        },
      ],
    };
  }
}
