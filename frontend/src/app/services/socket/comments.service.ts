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

  // Socket Methods
  sendComment(comment: any): void {
    this.socket.emit('newComment', comment);
  }

  updateComment(comment: any): void {
    this.socket.emit('updateComment', comment);
  }

  deleteComment(id: string): void {
    this.socket.emit('deleteComment', id);
  }

  onNewComment(): Observable<any> {
    return new Observable<Comment>(observer => {
      this.socket.on('comment', (data: Comment) => observer.next(data));
    });
  }

  onCommentDeleted(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('comment_deleted', (commentId: string) => observer.next(commentId));
    });
  }

  onComments(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('comments', (data: any) => observer.next(data));
    });
  }

  requestComments(articleId: string): void {
    this.socket.emit('requestComments', articleId);
  }
}
