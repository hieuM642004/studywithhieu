import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/user.service';
import { User } from '../../types/types';
import { ArticlesService } from '../../services/articles.service';
import { Articles } from '../../types/types';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss'],
})
export class DetailUserComponent implements OnInit {
  user: User | undefined;
  slug: string;
  userForm: FormGroup;
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
    private fb: FormBuilder
  ) {
    this.slug = '';
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: [''],
    });
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
        this.userForm.patchValue({
          username: this.user?.username,
          email: this.user?.email,
          avatar: this.user?.avatar,
        });
        if (this.user?.articles && this.user.articles.length > 0) {
          this.user.articles.forEach((article: any) => {
            this.userArticles.push(article);
          });
        }

        this.checkFollowingStatus(this.user);
        this.checkDisplayBtnFollow();
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  toggleFollow(): void {
    const followerId = this.authService.getAccessTokenPayload().id;
    const followedUserId = this.user?._id;

    if (this.isFollowing) {
      if (followedUserId) {
        this.usersService.unfollowUser(followedUserId, followerId).subscribe(() => {
          this.isFollowing = false;
        });
      }
    } else {
      if (followedUserId) {
        this.usersService.followUser(followedUserId, followerId).subscribe(() => {
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
          this.isFollowing = user.data.followers.some((follower: any) => {
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

  extractEpisodeData(set: any): FormData {
    const formData = new FormData();
    formData.append('username', set.username);
    formData.append('email', set.email);
    formData.append('avatar', set.avatar);
    return formData;
  }
  showUpdateDialog() {
    this.displayUpdateDialog = true;
  }

  hideUpdateDialog() {
    this.displayUpdateDialog = false;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('username', this.userForm.get('username')?.value);
    formData.append('email', this.userForm.get('email')?.value);
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }
    console.log(formData);
    
    this.usersService.editUser(this.slug, formData).subscribe(
      (response) => {
        console.log('User updated successfully', response);
        this.fetchUser(this.slug); 
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }
}
