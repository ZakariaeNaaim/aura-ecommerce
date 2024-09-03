import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService,private authService:AuthService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Management',
                items: [
                    ...(this.authService.userProfile.role.includes('ROLE_ORDERS') ? [{ label: 'Orders', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/pages/orders'] }] : []),
                    ...(this.authService.userProfile.role.includes('ROLE_PRODUCTS') ? [{ label: 'Products', icon: 'pi pi-fw pi-bars', routerLink: ['/pages/menu']}] : []),
                    ...(this.authService.userProfile.role.includes('ROLE_USERS') ? [{label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/pages/users']  }] : []),
                ]
            },
        ];
    }
}
