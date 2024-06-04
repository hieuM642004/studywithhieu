import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import {  Topics } from '../types/types';
import { API_URL } from '../constant/api';
import { HttpClient } from '@angular/common/http';

HttpClient
@Injectable({
  providedIn: 'root',
})
export class TopicsService {
  constructor(private apiService: ApiService, private http:HttpClient) {}

  // Getting topics from the API
  getTopics(): Observable<any> {
    return this.apiService.get(`${API_URL}/topics`, {
      responseType: 'json',
    });
  }

  getTopicsById(identifier: string): Observable<Topics> {
    return this.apiService.get(`${API_URL}/topics/${identifier}`, {
      responseType: 'json',
    });
  }
  

  // Adding a topic via the API
  addTopic = (url: string, body: any): Observable<Topics> => {
    return this.apiService.post(url, body, {});
  };

  // Editing a topic via the API
  editTopic = (url: string, body: any): Observable<Topics> => {
    return this.apiService.put(url, body, {});
  };

  // Deleting a topic via the API
  deleteTopic = (url: string): Observable<Topics> => {
    return this.apiService.delete(url, {});
  };
}
