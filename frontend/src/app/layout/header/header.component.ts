import { Component,OnInit } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';
import { ProfileUserComponent } from '../../components/profile-user/profile-user.component';
import { ButtonModule } from 'primeng/button';
import { NotificationComponent } from '../../components/notification/notification.component';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule,SearchComponent,ProfileUserComponent,NotificationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isAdmin: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
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
}
