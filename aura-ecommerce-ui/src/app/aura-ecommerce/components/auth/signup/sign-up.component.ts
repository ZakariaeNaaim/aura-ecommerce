import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/aura-ecommerce/core/services/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.component.html',
  styles: [],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public layoutService: LayoutService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.initializeSignupForm();
  }

  private initializeSignupForm(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [['ROLE_DASHBOARD']]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe({
        next: () => {
          this.showMessage('success', 'Success', 'User registered successfully, now sign in.');
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          const errorMessage = error?.message || 'Username or email is already taken.';
          this.showMessage('error', 'Error', errorMessage);
        }
      });
    }
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }
}
