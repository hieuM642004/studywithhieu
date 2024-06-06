import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/user.service';
import { ArticlesService } from '../../services/articles.service';
import { AuthService } from '../../services/auth.service';
import { FavoriteService } from '../../services/favorite.service';
import { User, Articles } from '../../types/types';
import { ToastComponent } from '../../components/toast/toast.component';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  user: User | undefined;
  slug: string;
  userForm!: FormGroup;
  activeTabIndex: number = 0;
  followed: any[] = [];
  favorites: any[] = [];
  userArticles: Articles[] = [];
  isFollowing: boolean = false;
  hideBtnFollower: boolean = true;
  displayUpdateDialog: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private favoriteService: FavoriteService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.slug = '';
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.initializeForm();

    if (this.slug) {
      this.fetchUser(this.slug);
    } else {
      console.error('Slug not found in URL');
    }
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: [''],
    });
  }

  fetchUser(slug: string): void {
    this.usersService.getUserById(slug).subscribe(
      (responseData) => {
        this.user = responseData.data;
        console.log(responseData.data);

        if (this.user) {
          this.userForm.patchValue({
            username: this.user.username,
            email: this.user.email,
            avatar: this.user.avatar,
          });
        }

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
      if (followedUserId) {
        this.usersService
          .followUser(followedUserId, followerId)
          .subscribe(() => {
            this.isFollowing = true;
          });
      }
    }
  }

  checkDisplayBtnFollow(): void {
    const followerId = this.authService.getAccessTokenPayload().id;
    const followedUserId = this.user?._id;
    this.hideBtnFollower = followedUserId !== followerId;
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

  onTabChange(event: any): void {
    const tabFragment =
      event.index === 0
        ? 'articles-posted'
        : event.index === 1
        ? 'followed'
        : 'favorited-article';
    this.router.navigate([], { fragment: tabFragment, relativeTo: this.route });
  }

  extractEpisodeData(set: any): FormData {
    const formData = new FormData();
    formData.append('username', set.username);
    formData.append('email', set.email);
    formData.append('avatar', set.avatar);
    return formData;
  }

  showUpdateDialog(): void {
    this.displayUpdateDialog = true;
  }

  hideUpdateDialog(): void {
    this.displayUpdateDialog = false;
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    if (!this.userForm || this.userForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('username', this.userForm.get('username')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }
    const currentUserId = this.authService.getAccessTokenPayload().id;

    this.usersService.editUser(currentUserId, formData).subscribe(
      (response) => {
        const newSlug = response.data.slug;
        this.router.navigate([`/my-account/${newSlug}`]).then(() => {
          this.fetchUser(newSlug);
        });

        this.hideUpdateDialog();
        this.toastComponent.showToast('User updated successfully', 'success');
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }
}
