import { NgModule } from '@angular/core';
import {  LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NotfoundComponent } from './aura-ecommerce/components/notfound/notfound.component';
import { ProductService } from './aura-ecommerce/service/product.service';
import { CountryService } from './aura-ecommerce/service/country.service';
import { CustomerService } from './aura-ecommerce/service/customer.service';
import { EventService } from './aura-ecommerce/service/event.service';
import { IconService } from './aura-ecommerce/service/icon.service';
import { NodeService } from './aura-ecommerce/service/node.service';
import { PhotoService } from './aura-ecommerce/service/photo.service';
import { AppLayoutModule } from './layout/app.layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './aura-ecommerce/auth/auth.interceptor';
import { TranslationModule } from "./shared/services/translation/translate.module";

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, TranslationModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
