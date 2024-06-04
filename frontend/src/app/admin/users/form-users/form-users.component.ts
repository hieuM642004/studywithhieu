import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../../services/user.service';
import { User, Articles } from '../../../types/types';


@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss']
})
export class FormUsersComponent implements OnInit {
  user: User | undefined;
  slug: string;
  userArticles: Articles[] = [];
  userForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private fb: FormBuilder
  ) {
    this.slug = '';
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      avatar: [''],
      role: ['']
    });
  }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('id') ?? '';
    console.log(this.slug);
    this.fetchUsers(this.slug);
  }
  extractEpisodeData(set: any): FormData {
    const formData = new FormData();
    formData.append('avatar', set.avatar);
    formData.append('username', set.username);
    formData.append('email', set.email);
    formData.append('role', set.role);
    return formData;
  }

  fetchUsers(slug: string) {
    this.usersService.getUserById(slug).subscribe(
      (responseData) => {
        this.user = responseData.data;
        this.userForm.patchValue({
          username: this.user?.username,
          email: this.user?.email,
          avatar: this.user?.avatar,
          role: this.user?.role,
        });
        console.log(this.user?.username);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
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
    formData.append('role', this.userForm.get('role')?.value);
    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.usersService.editUser(this.slug, formData).subscribe(
      (response) => {
        console.log('User updated successfully', response);
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }
}
