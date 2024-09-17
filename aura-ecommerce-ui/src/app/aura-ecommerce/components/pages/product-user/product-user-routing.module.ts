import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductUserComponent } from './product-user.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductUserComponent }
	])],
	exports: [RouterModule]
})
export class ProductUserRoutingModule { }
