import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'menu', loadChildren: () => import('../shared/crud/crud.module').then(m => m.CrudModule) },
        { path: 'orders', loadChildren: () => import('../shared/crud/crud.module').then(m => m.CrudModule) },
        { path: 'users', loadChildren: () => import('../shared/empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        // { path: 'crud', loadChildren: () => import('../shared/crud/crud.module').then(m => m.CrudModule) },
        // { path: 'empty', loadChildren: () => import('../shared/empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        // { path: 'timeline', loadChildren: () => import('../shared/timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
