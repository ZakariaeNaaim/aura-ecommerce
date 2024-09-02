import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    loginForm: FormGroup;

    constructor(private fb: FormBuilder, private authService: AuthService,public layoutService: LayoutService,
      public router : Router, private messageService: MessageService) {}
  
    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
    }
  
    onSubmit(): void {
      if (this.loginForm.valid) {
        const credentials = this.loginForm.value;
        this.authService.login(credentials).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'logged in !' });
            this.router.navigate(['/']);
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: "something wrong" });
          }
        });
      }
    }
}
