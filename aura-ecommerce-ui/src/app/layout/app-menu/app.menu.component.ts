import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,private authService:AuthService , private translationService : TranslationService) { }

    ngOnInit() {
        this.model = [
            {
                label:this.translationService.translate('APP_MENU.HOME'),
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: this.translationService.translate('APP_MENU.MANAGEMENT'),
                items: [
                    ...(this.authService.userProfile.role.includes('ROLE_ORDERS') ? [{ label: this.translationService.translate('APP_MENU.ORDERS'), icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/pages/orders'] }] : []),
                    ...(this.authService.userProfile.role.includes('ROLE_PRODUCTS') ? [{ label:this.translationService.translate('APP_MENU.PRODUCTS') , icon: 'pi pi-fw pi-bars', routerLink: ['/pages/product']}] : []),
                    ...(this.authService.userProfile.role.includes('ROLE_USERS') ? [{label:this.translationService.translate('APP_MENU.USERS'), icon: 'pi pi-fw pi-users', routerLink: ['/pages/users']  }] : []),
                ]
            },
        ];
    }
}
