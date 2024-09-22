import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'product-administration', loadChildren: () => import('./product-administration/product-administration.module').then(m => m.ProductAdministrationModule) },
        { path: 'product-user', loadChildren: () => import('./product-user/product-user.module').then(m => m.ProductUserModule) },
        { path: 'orders', loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) },
        { path: 'users', loadChildren: () => import('../pages/users/users.module').then(m => m.UserModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
