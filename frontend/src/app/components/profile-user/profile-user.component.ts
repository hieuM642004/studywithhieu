import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-profile-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './profile-user.component.html',
  styleUrl: './profile-user.component.scss'
})
export class ProfileUserComponent  implements OnInit{
  userPayload: any;
  loggingOut: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserPayload();
  }

  getUserPayload(): void {
    this.userPayload = this.authService.getAccessTokenPayload();
  }

  logoutAcount(): void {
    // Kiểm tra nếu đã đang logout thì không thực hiện lại
    if (this.loggingOut) return;
    
    this.loggingOut = true; 

   
    this.authService.logout().subscribe(
      () => {
        console.log('Logout successful');
        // Đã hoàn thành logout, log ra thông điệp 'clicked'
        console.log('clicked');
        window.location.reload();
      },
      (error) => {
        console.error('Error during logout:', error);
        // Có lỗi xảy ra trong quá trình logout, cần xử lý tại đây
      }
    );
  }
}
