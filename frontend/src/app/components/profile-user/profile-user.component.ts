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
  // loggingOut: boolean = false;

  constructor(private authService: AuthService,private cookieService:CookieService) { }

  ngOnInit(): void {
    this.getUserPayload();
  }

  getUserPayload(): void {
    this.userPayload = this.authService.getAccessTokenPayload();
  }

  logoutAcount(): void {
 
    // if (this.loggingOut) return;
    
    // this.loggingOut = true; 

   
    this.authService.logout().subscribe(
      () => {
        console.log('logged out');
        
        this.cookieService.delete('accessToken');
        this.cookieService.delete('refreshToken');
        window.location.reload();
      },
      (error) => {
        console.error('Error during logout:', error);

      }
    );
  }
}
