import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { AuthGuard } from 'src/app/aura-ecommerce/auth/auth.guard';

@NgModule({
	imports: [RouterModule.forChild([
		{ 
			path: '', component: OrdersComponent ,
			canActivate: [AuthGuard],
            data: { role: ['ROLE_ORDERS','ROLE_PRODUCTS'] }
		}
	])],
	exports: [RouterModule]
})
export class OrdersRoutingModule { }
