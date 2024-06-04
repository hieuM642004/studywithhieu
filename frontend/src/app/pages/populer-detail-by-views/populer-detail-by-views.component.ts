import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles.service';
import { Articles, PaginatedArticles } from '../../types/types';
import { User } from '../../types/types';
@Component({
  selector: 'app-populer-detail-by-views',
  templateUrl: './populer-detail-by-views.component.html',
  styleUrl: './populer-detail-by-views.component.scss',
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

  constructor(
    private articlesService: ArticlesService,
  ) {}

  ngOnInit(): void {
    this.fetchArticles(this.currentPage, this.pageSize);
  }

  fetchArticles(page: number, limit: number) {
    this.articlesService
      .getArticles(page, limit)
      .subscribe((articlesData: PaginatedArticles) => {
        if (
          articlesData &&
          articlesData.data &&
          Array.isArray(articlesData.data.data)
        ) {
          this.data = articlesData.data.data;
          this.totalPages = articlesData.data.totalPages;
          this.currentPage = Number(articlesData.data.currentPage);
          this.totalItems = articlesData.data.totalItems;
          this.totalPagesArray = Array.from(
            { length: this.totalPages },
            (_, i) => i + 1
          );
          this.setTopItems();
        } else {
          console.error('Data from articles not formatted');
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
