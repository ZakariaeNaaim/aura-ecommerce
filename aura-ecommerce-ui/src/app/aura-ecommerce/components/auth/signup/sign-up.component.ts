import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-signup',
    templateUrl: './sign-up.component.html',
    styles: [],
    providers: [MessageService]
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,public layoutService:LayoutService,private router:Router,
              private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [['ROLE_DASHBOARD']]
    });
  }

  onSignup(): void {
    if (this.signupForm.valid) {
      this.authService.register(this.signupForm.value).subscribe(
        {
          next : ()=>{
            this.router.navigate(['/auth/login']);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'user is registred successfuly, now signin' });
          },
          error :()=>{
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "user or mail is already taken" });
          }
        }
      );
    }
  }
}