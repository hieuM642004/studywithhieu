import { Component, OnInit, Input } from '@angular/core';
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
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
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
  constructor(
    private commentService: CommentService,
    private readonly authService: AuthService,
    private readonly authGuard: AuthGuard
  ) {}

  ngOnInit(): void {
    this.commentSubscription = this.commentService
      .onComments()
      .subscribe((comments: any[]) => {
        this.rootComments = comments.filter(comment => comment.parentId === null);
        console.log(comments);
        
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

    this.commentService.onUpdateCommentSuccess().subscribe((updatedComment: any) => {
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

    this.commentService.onDeleteCommentSuccess().subscribe((deletedComment: any) => {
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
    return this.comments.filter(comment => comment.parentId === commentId);
  }
  
}
