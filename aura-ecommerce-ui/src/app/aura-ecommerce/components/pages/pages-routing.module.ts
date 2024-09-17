import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'product-administration', loadChildren: () => import('./product-administration/product-administration.module').then(m => m.ProductAdministrationModule) },
        { path: 'product-user', loadChildren: () => import('./product-user/product-user.module').then(m => m.ProductUserModule) },
        { path: 'orders', loadChildren: () => import('./orders/crud.module').then(m => m.CrudModule) },
        { path: 'users', loadChildren: () => import('../pages/users/users.module').then(m => m.UserModule) },
        // { path: 'crud', loadChildren: () => import('../shared/crud/crud.module').then(m => m.CrudModule) },
        // { path: 'empty', loadChildren: () => import('../shared/empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        // { path: 'timeline', loadChildren: () => import('../shared/timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
