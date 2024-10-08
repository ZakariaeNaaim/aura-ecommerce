import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { TranslationModule } from "../../../../shared/services/translation/translate.module";

@NgModule({ declarations: [LoginComponent], imports: [CommonModule,
        LoginRoutingModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule,
        ToastModule,
        TranslationModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class LoginModule { }
