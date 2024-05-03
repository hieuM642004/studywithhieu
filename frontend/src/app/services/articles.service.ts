import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Articles } from '../types/types';
import { API_URL } from '../constant/api';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  // Getting articles from the API
  getArticles(): Observable<{ data: Articles[] }> { 
    return this.apiService.get(`${API_URL}/articles`, {
      responseType: 'json',
    });
  }
  getArticlesById(identifier: string): Observable<any> {
    return this.apiService.get(`${API_URL}/articles/${identifier}`, {
      responseType: 'json',
    });
  }
  

  // Adding a article via the API
  addArticle = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  // Editing a article via the API
  editArticle = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  // Deleting a article via the API
  deleteArticle = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}
