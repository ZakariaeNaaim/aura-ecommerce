import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './aura-ecommerce/components/notfound/notfound.component';
import { ProductService } from './aura-ecommerce/components/pages/product-administration/services/product.service';
import { AppLayoutModule } from './layout/app.layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './aura-ecommerce/core/interceptor/auth.interceptor';
import { TranslationModule } from './shared/services/translation/translate.module';
import { OrdersService } from './aura-ecommerce/components/pages/orders/services/orders.service';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, TranslationModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        ProductService,
        OrdersService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
