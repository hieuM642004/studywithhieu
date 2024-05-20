import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserPayload();
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
