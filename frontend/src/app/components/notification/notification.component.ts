import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/socket/notification.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit{

  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotifications(); // Lấy thông báo đã có trước đó
    this.notificationService.notifications$.subscribe((notifications) => {
      console.log(notifications);
      
      this.notifications = notifications; // Cập nhật danh sách thông báo
    });
  }
}
