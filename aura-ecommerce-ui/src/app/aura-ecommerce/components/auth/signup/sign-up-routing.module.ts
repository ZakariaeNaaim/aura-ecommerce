import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignupComponent } from './sign-up.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: SignupComponent }
    ])],
    exports: [RouterModule]
})
export class SignupRoutingModule { }
