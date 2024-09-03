import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from 'src/app/aura-ecommerce/auth/auth.guard';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '', component: DashboardComponent,
            canActivate: [AuthGuard],
            data: { role: ['ROLE_DASHBOARD'] }
        }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
