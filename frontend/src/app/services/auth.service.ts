import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { User } from '../types/types';
import { API_URL } from '../constant/api';
import { jwtDecode } from 'jwt-decode';
import { HttpClient, HttpHeaders } from '@angular/common/http';
HttpHeaders;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  register(body: any): Observable<any> {
    return this.apiService.post(`${API_URL}/auth/register`, body, {});
  }
  forgotPassword(body: any): Observable<any> {
    return this.apiService.post(`${API_URL}/auth/forgot-password`, body, {});
  }
  resetPassword(body: any, token: any): Observable<any> {
    console.log(body, token);

    return this.apiService.post(
      `${API_URL}/auth/reset-password?token=${token}`,
      body,
      {}
    );
  }
  login(body: any): Observable<any> {
    return this.apiService.post(`${API_URL}/auth/login`, body, {});
  }
  getAccessTokenPayload(): any {
    const accessToken = this.cookieService.get('accessToken');
    if (accessToken) {
      return jwtDecode(accessToken);
    }
    return null;
  }

  isAdmin(): boolean {
    const payload = this.getAccessTokenPayload();
    return payload && payload.role === 'admin';
  }

  isAccessTokenExpired(): boolean {
    const payload = this.getAccessTokenPayload();
    if (payload && payload.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    }
    return true;
  }

  refreshAccessToken(): Observable<string> {
    const refreshToken = this.cookieService.get('refreshToken');
    return this.http.post<{ accessToken: string }>(`${API_URL}/auth/refresh-token`, { refresh_token: refreshToken })
      .pipe(map(response => response.accessToken));
  }

  getAccessToken(): any {
    const accessToken = this.cookieService.get('accessToken');
    if (accessToken) {
      return accessToken;
    }
    return null;
  }
  isLoggedIn(): boolean {
    const accessToken = this.cookieService.get('accessToken');
    return !!accessToken;
  }
  logout(): Observable<any> {
    const refreshToken = this.cookieService.get('refreshToken');

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = JSON.stringify({ refresh_token: refreshToken });

    return this.http.post(`${API_URL}/auth/logout`, body, { headers });
  }
}
