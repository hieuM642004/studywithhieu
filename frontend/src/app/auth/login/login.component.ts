import { Component, inject, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule,ReactiveFormsModule,ForgotPasswordComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [CookieService],
})
export class LoginComponent {
  userForm: FormGroup;
errors:any

  constructor(private formBuilder: FormBuilder, private authService: AuthService,private cookieService:CookieService) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.userForm.valid) {
      // Submit form
      try {
        const response = await this.authService.login(this.userForm.value).toPromise();
        if (response && response.accessToken) {
          this.cookieService.set('accessToken', response.accessToken);
          this.cookieService.set('refreshToken', response.refreshToken);
          window.location.href = 'http://localhost:4200/';
        } 
      } catch (error:any) {
      this.errors= error.error.message
        
      }
    } else {
      // Form is invalid, display error messages
      this.userForm.markAllAsTouched();
    }
  }

}

