import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styles: []
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,public layoutService:LayoutService,private router:Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [['ROLE_USER']]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe(
        {
          next : ()=>{
            this.router.navigate(['/auth/login'])
          },
          error :(error)=>{
          }
        }
      );
    }
  }
}