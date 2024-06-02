import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommentService } from '../../services/socket/comments.service';
import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../../guards/auth.guard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() articleId: any;
  comments: any[] = [];
  commentSubscription: Subscription | undefined;
  currentUserId: string = '';

  constructor(
    private commentService: CommentService,
    private readonly authService: AuthService,
    private readonly authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    const accessTokenPayload = this.authService.getAccessTokenPayload();
    this.currentUserId = accessTokenPayload ? accessTokenPayload.id : null;

    this.commentSubscription = this.commentService.onComments().subscribe((comments: any[]) => {
      this.loadComments(comments);
      console.log(comments);
    });

    this.commentService.requestComments(this.articleId);

    this.commentService.onNewComment().subscribe((newComment: any) => {
      if (newComment.parentId === null) {
        this.comments.push(newComment);
      } else {
        const parentComment = this.comments.find(comment => comment._id === newComment.parentId);
        if (parentComment) {
          parentComment.replies.push(newComment);
        }
      }
    });

    this.commentService.onUpdateCommentSuccess().subscribe((updatedComment: any) => {
      const index = this.comments.findIndex(c => c._id === updatedComment._id);
      if (index !== -1) {
        this.comments[index] = updatedComment;
      }
    });

    this.commentService.onDeleteCommentSuccess().subscribe((deletedComment: any) => {
      this.comments = this.comments.filter(comment => comment._id !== deletedComment._id);
      this.comments.forEach(comment => {
        comment.replies = comment.replies.filter((reply: any) => reply._id !== deletedComment._id);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }

  loadComments(comments: any[]): void {
    this.comments = comments.map(comment => {
      if (comment.parentId === null) {
        return { ...comment, replies: comments.filter(c => c.parentId === comment._id) };
      }
      return null;
    }).filter(comment => comment !== null);
  }

  deleteComment(commentId: string): void {
    const comment = this.comments.find(c => c._id === commentId);
    if (comment && !this.canDeleteComment(comment)) {
      console.error('User does not have permission to delete this comment.');
      return;
    }
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(commentId).subscribe(
        () => {},
        (error: any) => {
          console.error('Error deleting comment:', error);
        }
      );
    }
  }

  canDeleteComment(comment: any): boolean {
    return comment.idUser._id === this.currentUserId;
  }
}
