import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsersService } from '../../services/user.service';
import { User } from '../../types/types';
import { ArticlesService } from '../../services/articles.service';
import { Articles } from '../../types/types';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss',
})
export class DetailUserComponent {
  user: User | undefined;
  slug: string;
  userArticles: Articles[] = [];
  isFollowing: boolean = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private articlesService: ArticlesService
  ) {
    this.slug = '';
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    if (this.slug) {
      this.fetchUser(this.slug);
    } else {
      console.error('Slug not found in URL');
    }
    
  }

  fetchUser(slug: string) {
    this.usersService.getUserById(slug).subscribe(
      (responseData) => {
        this.user = responseData.data;

        this.fetchUserArticles();
        this.checkFollowingStatus(this.user);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  fetchUserArticles() {
    if (this.user && this.user.articles && this.user.articles.length > 0) {
      this.user.articles.forEach((articleId) => {
        this.articlesService.getArticlesById(articleId).subscribe(
          (articleData) => {
            this.userArticles.push(articleData.data);
          },
          (error) => {
            console.error('Error fetching article:', error);
          }
        );
      });
    }
  }

  toggleFollow(): void {
    const followerId = this.authService.getAccessTokenPayload().id;
    const followedUserId = this.user?._id;
    if (this.isFollowing) {
      if (followedUserId) {
        this.usersService
          .unfollowUser(followedUserId, followerId)
          .subscribe(() => {
            this.isFollowing = false;
          });
      }
    } else {
      const followedUserId = this.user?._id;

      if (followedUserId) {
        this.usersService
          .followUser(followedUserId, followerId)
          .subscribe(() => {
            this.isFollowing = true;
          });
      }
    }
  }

  checkFollowingStatus(userData: any): void {
    const userId = this.authService.getAccessTokenPayload().followers;

    if (userId) {
      this.isFollowing = userId.some((follower: any) => {
        return follower.userId === userData._id;
      });
    } else {
      this.isFollowing = false;
    }
  }
}
