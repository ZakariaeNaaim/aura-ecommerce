import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './users.component';
import { AuthGuard } from 'src/app/aura-ecommerce/core/guards/auth.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{
			path: '', component: UserComponent,
			canActivate: [AuthGuard],
			data: { role: ['ROLE_USERS'] }
		}
	])],
	exports: [RouterModule]
})
export class UserRoutingModule { }
