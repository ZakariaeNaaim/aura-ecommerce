import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductAdministrationComponent } from './product-administration.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ProductAdministrationComponent }
	])],
	exports: [RouterModule]
})
export class ProductAdministrationRoutingModule { }
