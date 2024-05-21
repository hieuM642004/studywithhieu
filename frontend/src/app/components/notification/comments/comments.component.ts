import { Component, OnInit,Input } from '@angular/core';
import { CommentService } from '../../../services/socket/comments.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit{
  @Input() articleId: any;
  newComment: any = {
    idUser: '',
    idArticle: '',
    content: '',
  };
  comments: any[] = [];
  commentSubscription: Subscription | undefined;
  constructor(private commentService: CommentService, private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.commentSubscription = this.commentService.onComments().subscribe((comments: any[]) => {
      this.comments = comments;
    });

    this.commentService.requestComments(this.articleId);

   
    this.commentService.onNewComment().subscribe((newComment: any) => {
      this.comments.push(newComment);
    });
  }

  ngOnDestroy(): void {
    if (this.commentSubscription) {
      this.commentSubscription.unsubscribe();
    }
  }

  sendNewComment(): void {
    const userId = this.authService.getAccessTokenPayload().id; 
    this.newComment.idUser = userId;
    this.newComment.idArticle = this.articleId!;
    this.commentService.sendComment(this.newComment);
    this.newComment.content = '';  
  }

  toggleDropdown(id: string) {
    const dropdown = document.getElementById(id);
    if (dropdown) {
        dropdown.classList.toggle('hidden');
    }
}

}
