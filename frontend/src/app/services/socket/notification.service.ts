import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { SocketService } from './connect.socket';
import { AuthService } from '../auth.service';
AuthService
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
    private socket: Socket;
    private notificationsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    public notifications$: Observable<any[]> = this.notificationsSubject.asObservable();
  
    constructor(private socketService: SocketService, private authService: AuthService) {
      this.socket = this.socketService.getSocket();
      this.initRealTimeNotifications();
    }
  
    private initRealTimeNotifications(): void {
      this.socket.on('notification', (notification) => {
        this.notificationsSubject.next([...this.notificationsSubject.value, notification]);
      });
    }
  
    public getNotifications(): void {
      const userId = this.authService.getAccessTokenPayload().id;
      this.socket.emit('requestNotifications', userId);
      
   
      this.socket.on('notifications', (notifications) => {
        this.notificationsSubject.next(notifications);
      });
    }
    
 
}
