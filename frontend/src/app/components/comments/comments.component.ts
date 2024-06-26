import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CommentService } from '../../services/socket/comments.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthGuard } from '../../guards/auth.guard';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() articleId: any;
  newComment: any = {
    idUser: '',
    idArticle: '',
    content: '',
  };
  comments: any[] = [];
  rootComments: any[] = [];
  commentSubscription: Subscription | undefined;
  isDisplayMore: boolean = false;
  router: any;
  currentUserId: string = '';

  constructor(
    private commentService: CommentService,
    private readonly authService: AuthService,
    private readonly authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    const accessTokenPayload = this.authService.getAccessTokenPayload();
    this.currentUserId = accessTokenPayload ? accessTokenPayload.id : null;

    this.commentSubscription = this.commentService
      .onComments()
      .subscribe((comments: any[]) => {
        console.log(comments);
        
        this.rootComments = comments.filter(
          (comment) => comment.parentId === null
        );

        this.comments = comments;
      });

    this.commentService.requestComments(this.articleId);

    this.commentService.onNewComment().subscribe((newComment: any) => {
      newComment.isDisplayMore = false;
      if (newComment.parentId === null) {
        this.rootComments.push(newComment);
      }

      this.comments.push(newComment);
    });

    this.commentService
      .onUpdateCommentSuccess()
      .subscribe((updatedComment: any) => {
        const index = this.comments.findIndex(
          (c) => c._id === updatedComment._id
        );
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }

        if (updatedComment.parentId === null) {
          const rootIndex = this.rootComments.findIndex(
            (c) => c._id === updatedComment._id
          );
          if (rootIndex !== -1) {
            this.rootComments[rootIndex] = updatedComment;
          }
        }
      });

    this.commentService
      .onDeleteCommentSuccess()
      .subscribe((deletedComment: any) => {
        this.comments = this.comments.filter(
          (comment) => comment._id !== deletedComment._id
        );

        if (deletedComment.parentId === null) {
          this.rootComments = this.rootComments.filter(
            (comment) => comment._id !== deletedComment._id
          );
        }
      });
  }

  ngOnDestroy(): void {
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }

  canEditComment(comment: any): boolean {
    return comment.idUser._id === this.currentUserId;
  }

  canDeleteComment(comment: any): boolean {
    return comment.idUser._id === this.currentUserId;
  }

  sendNewComment(): void {
    if (!this.authGuard.canActivate()) {
      this.router.navigate(['/login']);
      return;
    }
    const userId = this.authService.getAccessTokenPayload().id;
    this.newComment.idUser = userId;
    this.newComment.idArticle = this.articleId!;
    this.commentService.sendComment(this.newComment);
    this.newComment.content = '';
  }

  saveEdit(comment: any): void {
    if (!this.canEditComment(comment)) {
      console.error('User does not have permission to edit this comment.');
      return;
    }
    comment.isEditing = false;
    this.commentService.updateComment(comment).subscribe(
      (updatedComment: any) => {
        console.log('Comment updated:', updatedComment);
        const index = this.comments.findIndex(
          (c) => c._id === updatedComment._id
        );
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }
      },
      (error: any) => {
        console.error('Error updating comment:', error);
      }
    );
  }

  toggleDropdown(comment: any) {
    comment.showDropdown = !comment.showDropdown;

    if (comment.showDropdown) {
      this.comments.forEach((c: any) => {
        if (c !== comment) {
          c.showDropdown = false;
        }
      });
    }
  }

  toggleEdit(comment: any) {
    if (!this.canEditComment(comment)) {
      console.error('User does not have permission to edit this comment.');
      return;
    }
    comment.originalContent = comment.content;
    comment.isEditing = true;

    this.comments.forEach((c: any) => {
      if (c !== comment) {
        c.showDropdown = false;
      }
    });
  }

  cancelEdit(comment: any) {
    comment.content = comment.originalContent;
    comment.isEditing = false;
  }

  deleteComment(commentId: string): void {
    const comment = this.comments.find((c) => c._id === commentId);
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

  replyToComment(parentComment: any) {
    parentComment.isReplying = true;
  }

  sendReply(parentComment: any) {
    const userId = this.authService.getAccessTokenPayload().id;
    const newReply = {
      idUser: userId,
      idArticle: this.articleId!,
      parentId: parentComment._id,
      content: parentComment.newReplyContent,
    };

    this.commentService.sendComment(newReply);
    parentComment.newReplyContent = '';
    parentComment.isReplying = false;
  }

  cancelReply(parentComment: any) {
    parentComment.isReplying = false;
    parentComment.newReplyContent = '';
  }

  toggleDisplayMore(comment: any): void {
    comment.isDisplayMore = !comment.isDisplayMore;
  }

  getRepliesForComment(commentId: string): any {
    return this.comments.filter((comment) => comment.parentId === commentId);
  }
}
