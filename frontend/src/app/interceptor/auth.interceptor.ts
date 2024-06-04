import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Interceptor called with request:', req);
    const accessToken = this.cookieService.get('accessToken');
    const clonedReq = this.addTokenToRequest(req, accessToken);

    return next.handle(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.error.statusCode === 401 &&
          this.authService.isAccessTokenExpired()
        ) {
          return this.authService.refreshAccessToken().pipe(
            switchMap((newAccessToken: string) => {
           

              this.cookieService.set('accessToken', newAccessToken);

              const newClonedReq = this.addTokenToRequest(req, newAccessToken);
              return next.handle(newClonedReq);
            }),
            catchError((refreshError) => {
              return throwError(refreshError);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private addTokenToRequest(
    req: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
