import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
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

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
