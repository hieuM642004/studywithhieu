import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginatedArticles, Episodes } from '../types/types';
import { API_URL } from '../constant/api';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  // Getting episodes from the API
  getEpisodes(): Observable<any> {
    return this.apiService.get(`${API_URL}/episodes`, {
      responseType: 'json',
    });
  }

  getEpisodesById(identifier: string): Observable<any> {
    return this.apiService.get(`${API_URL}/episodes/${identifier}`, {
      responseType: 'json',
    });
  }

  // Adding a episode via the API
  addEpisode(body: any): Observable<any> {
    return this.apiService.post(`${API_URL}/episodes`, body, {});
  }

  // Editing a episode via the API

  editEpisode = (identifier: string, body: any): Observable<any> => {
    return this.apiService.put(`${API_URL}/episodes/${identifier}`, body, {});
  };

  // Deleting a article via the API
  deleteArticle = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}
