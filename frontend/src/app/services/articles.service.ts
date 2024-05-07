import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginatedArticles, Articles } from '../types/types';
import { API_URL } from '../constant/api';
import { HttpClient } from '@angular/common/http';

HttpClient
@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private apiService: ApiService, private http:HttpClient) {}

  // Getting articles from the API
  getArticles(page: number, limit: number): Observable<PaginatedArticles> {
    return this.http.get<PaginatedArticles>(`${API_URL}/articles?page=${page}&limit=${limit}`);
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
