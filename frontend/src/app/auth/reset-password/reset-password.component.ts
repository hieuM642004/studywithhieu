import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  userForm!: FormGroup;
  errors: string | null = null;
  token: string | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private authService: AuthService,private readonly router: Router,) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  onSubmit(): void {
    
    if (this.userForm.valid && this.token) {
      const newPassword = this.userForm.get('password')?.value;
      console.log(newPassword,this.token);
      if (newPassword) {
        this.authService.resetPassword({ newPassword: newPassword }, this.token).subscribe(
          response => {
           alert('Password reset successful');
           this.router.navigate(['/login']); 
          },
          error => {
            console.error('Password reset failed:', error);
            this.errors = 'Password reset failed. Please try again.';
          }
        );
      }
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
