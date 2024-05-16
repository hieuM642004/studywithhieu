import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
// import { PaginatedArticles, Favorites } from '../types/types';
import { API_URL } from '../constant/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private apiService: ApiService, private http:HttpClient) {}

  // Getting favorites from the API
  getFavorites(): Observable<any> {
    return this.apiService.get(`${API_URL}/favorites`, {
      responseType: 'json',
    });
  }

  getFavoritesById(identifier: string): Observable<any> {
    return this.apiService.get(`${API_URL}/favorites/${identifier}`, {
      responseType: 'json',
    });
  }
  

  // Adding a favorite via the API
  addFavorite(body: any): Observable<any> {
    return this.apiService.post(`${API_URL}/favorites`, body, {});
  }

  // Editing a favorite via the API
  editFavorite = (body: any): Observable<any> => {
    return this.apiService.put(`${API_URL}/favorites`, body, {});
  };

  // Deleting a article via the API
  deleteFavorite  = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
  countFavoritesByArticleId  = (articleId: string): Observable<any> => {
    return this.apiService.get(`${API_URL}/favorites/${articleId}/count-likes`,{});
  };
}
