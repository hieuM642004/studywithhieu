import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from '../types/types';
import { API_URL } from '../constant/api'; 

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: ApiService) {}

  // Getting users from the API
  getUsers(): Observable<{ data: User[]}> {
    return this.apiService.get(`${API_URL}/users`, {
      responseType: 'json',
    });
  }

  // Getting a user by ID from the API
  getUserById(userId: string): Observable<any> {
    return this.apiService.get<User>(`${API_URL}/users/${userId}`, {
      responseType: 'json',
    });
  }

  // Adding a user via the API
  addUser(body: any): Observable<any> {
    return this.apiService.post(`${API_URL}/users`, body, {});
  }

  // Editing a user via the API
  editUser(userId: string, body: any): Observable<any> {
    return this.apiService.put(`${API_URL}/users/${userId}`, body, {});
  }

  // Deleting a user via the API
  deleteUser(userId: string): Observable<any> {
    return this.apiService.delete(`${API_URL}/users/${userId}`, {});
  }

    // follow a user via the API
    followUser(followedUserId:string, userId:string): Observable<any> {
      const body = {
        userId: followedUserId,
        followerId: userId
      };
      return this.apiService.post(`${API_URL}/users/follow`, body, {});
    }
    // follow a user via the API
    unfollowUser(followedUserId:string, userId:string): Observable<any> {
      const body = {
        userId: followedUserId,
        followerId: userId
      };
      return this.apiService.post(`${API_URL}/users/unfollow`, body, {});
    }

}
