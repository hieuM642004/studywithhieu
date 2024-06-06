import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/socket/notification.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit{

  notifications: any[] = [];

  constructor(private notificationService: NotificationService,private authService:AuthService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications(); 
    this.notificationService.notifications$.subscribe((notifications) => {
      console.log(notifications);
      const currentUserId = this.authService.getAccessTokenPayload().id;
      this.notifications = notifications.filter(
        notification => notification.recipient._id === currentUserId
      );
    });
  }
}
