import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup;
  avatarPreview: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      avatar: [''],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      this.registerForm.patchValue({
        avatar: file
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      this.registerForm.patchValue({
        avatar: ''
      });
    }
  }

  async signUp() {
    if (this.registerForm.valid) {
      try {
        const formData = new FormData();
        const formValue = this.registerForm.value;

        formData.append('avatar', formValue.avatar);
        formData.append('username', formValue.username);
        formData.append('email', formValue.email);
        formData.append('password', formValue.password);
        formData.append('role', 'user');


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
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  clearError(fieldName: string) {
    if (this.registerForm.get(fieldName)?.valid) {
      this.registerForm.get(fieldName)?.setErrors(null);
    }
  }
  
}
