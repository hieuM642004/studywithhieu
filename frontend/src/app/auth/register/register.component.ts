import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  user: any = {};
  avatarPreview: any;
  constructor(private authService: AuthService) {}
  handleFileInput(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];

      this.user.avatar = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.user.avatar = '';
    }
  }

  async signUp() {
    try {
      const formData = new FormData();

      formData.append('avatar', this.user.avatar);
      formData.append('username', this.user.username);
      formData.append('email', this.user.email);
      formData.append('password', this.user.password);
      formData.append('role', 'user');

      console.log(formData);

      const response = await this.authService.register(formData).toPromise();

      if (response && response.statusCode === 201) {
        alert('Registration successful');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error(error);
      alert('Registration failed');
    }
  }
}
