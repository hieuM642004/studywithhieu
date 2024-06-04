import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  visible: boolean = false;
  forgotPasswordForm!: FormGroup;
  loading: boolean = false; 
  error: string | null = null; 
  success: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  showDialog(): void {
    this.visible = true;
    this.success = false; 
    this.error = null;
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault(); 
    if (this.forgotPasswordForm.valid) {
      this.loading = true; 
      this.error = null; 
      try {
        const response = await this.authService.forgotPassword(this.forgotPasswordForm.value).toPromise();
        this.success = true; 
        setTimeout(() => {
          this.visible = false; 
        }, 2000);
   
      } catch (error: any) {
        this.error="Email not found"
        console.log(error);
      } finally {
        this.loading = false; 
      }
    }
  }
}
