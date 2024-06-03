import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { PaginatedArticles, Articles } from '../types/types';
import { API_URL } from '../constant/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { SocketService } from './socket/connect.socket';

HttpClient
@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private socket: Socket;
  constructor(private apiService: ApiService, private http:HttpClient,private readonly authService:AuthService,private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }
  
  // Getting articles from the API
  getArticles(page: number, limit: number,search?:string): Observable<PaginatedArticles> {
   let url= `${API_URL}/articles?page=${page}&limit=${limit}`;
   if(search){
    url += `&search=${encodeURIComponent(search)}`;
   }
   return this.http.get<PaginatedArticles>(url,{
    headers: new HttpHeaders().set('Authorization','Bearer ' + this.authService.getAccessToken()),
  })
  }
  getTopArticles(): Observable<PaginatedArticles> {
  
   return this.http.get<PaginatedArticles>(`${API_URL}/articles/top`,{
    headers: new HttpHeaders().set('Authorization','Bearer ' + this.authService.getAccessToken()),
  })
  }

  getArticlesById(identifier: string): Observable<any> {
    return this.apiService.get(`${API_URL}/articles/${identifier}`, {
      responseType: 'json',
    });
  }
  

 
  async addArticle(body: any): Promise<any> {
    try {
      const articleResponse: any = await this.apiService.post(`${API_URL}/articles`, body, {}).toPromise();
  
      const articleData = {
        userId: this.authService.getAccessTokenPayload().id,
        articleId: articleResponse.data._id,
      };
  
      this.socket.emit('newArticle', articleData);
  
      return articleResponse;
    } catch (error) {
      console.error('Error adding article:', error);
      throw error; 
    }
  }
  

  // Editing a article via the API
  editArticle = (identifier: string,body: any): Observable<any> => {
    return this.apiService.put(`${API_URL}/articles/${identifier}`, body, {});
  };

  // Deleting a article via the API
  deleteArticle = (identifier: string): Observable<any> => {
    return this.apiService.delete(`${API_URL}/articles/${identifier}`,{});
  };
}
