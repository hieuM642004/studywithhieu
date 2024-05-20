import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:3002');
  }

  sendComment(comment: any): void {
    this.socket.emit('newComment', comment);
  }


  onNewComment(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('comment', (data: any) => observer.next(data));
    });
  }

  onCommentDeleted(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('comment_deleted', (commentId: string) => observer.next(commentId));
    });
  }
}
