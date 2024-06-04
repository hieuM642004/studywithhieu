import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { SocketService } from './connect.socket';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private socket: Socket;

  constructor(private socketService: SocketService) {
    this.socket = this.socketService.getSocket();
  }

  // Socket Methods
  sendComment(comment: any): void {
    this.socket.emit('newComment', comment);
  }

  updateComment(comment: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.emit('updateComment', comment, (response: any) => {
        if (response.success) {
          observer.next(response.updatedComment); 
          observer.complete(); 
        } else {
          observer.error(response.error); 
        }
      });
    });
  }
  
  deleteComment(commentId: string): Observable<any> {
    return new Observable<any>(observer => {
    
      this.socket.emit('deleteComment', commentId, (response: any) => {
        if (response.success) {
         
          observer.next(response.deletedComment);
          observer.complete();
        } else {
         
          observer.error(response.error);
        }
      });
    });
  }
  

  onNewComment(): Observable<any> {
    return new Observable<Comment>(observer => {
      this.socket.on('comment', (data: Comment) => observer.next(data));
    });
  }

  onUpdateCommentSuccess(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('updateCommentSuccess', (updatedComment: any) => observer.next(updatedComment)); 
    });
  }
  
  onDeleteCommentSuccess(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on('deleteCommentSuccess', (deletedComment: any) => observer.next(deletedComment)); 
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
