import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/user.service';
import { User } from '../../types/types';
import { ArticlesService } from '../../services/articles.service';
import { Articles } from '../../types/types';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrl: './detail-user.component.scss',
})
export class DetailUserComponent {
  user: User | undefined;
  slug: string;
  activeTabIndex: number = 0;
  followed: any[] = [];
  favorites: any[] = [];
  userArticles: Articles[] = [];
  isFollowing: boolean = false;
  hideBtnFollower: boolean = true;
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private favoriteService: FavoriteService,
    private router: Router
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
        if (this.user?.articles && this.user.articles.length > 0) {
          this.user.articles.forEach((article: any) => {
            this.userArticles.push(article);

            if (this.user?.followers && this.user.followers.length > 0) {
              this.followed = this.user.followers;
            }
          });
        }

        this.myFavorite(this.user?._id ?? '');

        this.checkFollowingStatus(this.user);
        this.checkDisplayBtnFollow();
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  myFavorite(idUser: string): void {
    this.favoriteService.getFavorites().subscribe((favorites) => {
      const loved = favorites.data.find((f: any) => f.idUser._id === idUser);
      this.favorites = loved.idArticle;
    });
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
  checkDisplayBtnFollow() {
    const followerId = this.authService.getAccessTokenPayload().id;
    const followedUserId = this.user?._id;
    if (followedUserId === followerId) {
      this.hideBtnFollower = false;
    } else {
      this.hideBtnFollower = true;
    }
  }
  checkFollowingStatus(userData: any): void {
    const userId = this.authService.getAccessTokenPayload().id;
    if (userId) {
      this.usersService.getUserById(userId).subscribe(
        (user: any) => {
          console.log(user);

          this.isFollowing = user.data.followers.some((follower: any) => {
            console.log(follower);
            return follower.userId === userData._id;
          });
        },
        (error) => {
          console.error('Error getting user by ID:', error);
          this.isFollowing = false;
        }
      );
    } else {
      this.isFollowing = false;
    }
  }
  onTabChange(event: any) {
    const tabFragment =
      event.index === 0
        ? 'articles-posted'
        : event.index === 1
        ? 'followed'
        : 'favorited-article';
    this.router.navigate([], { fragment: tabFragment, relativeTo: this.route });
  }
}
