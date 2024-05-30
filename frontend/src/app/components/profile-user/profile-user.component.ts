import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss',
})
export class ProfileUserComponent implements OnInit {
  userPayload: any;
  private destroy$ = new Subject<void>();
  isAdmin: boolean = false;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserPayload();
    this.router.events
    .pipe(
      filter((event: any) => event instanceof NavigationEnd)
    )
    .subscribe((event: NavigationEnd) => {
      this.isAdmin = this.checkIfAdminRoute(event.url);
    });
  }

  private checkIfAdminRoute(url: string): boolean {
    return url.includes('/admin');
  }
  
  getUserPayload(): void {
    this.userPayload = this.authService.getAccessTokenPayload();
  }

  logoutAcount(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          console.log('Logged out');
          this.cookieService.delete('accessToken');
          this.cookieService.delete('refreshToken');

          this.router.navigate(['']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error during logout:', error);
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('ProfileUserComponent destroyed');
  }
}
