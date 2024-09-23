import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { AuthService } from 'src/app/aura-ecommerce/core/services/auth.service';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';
import { MenuItem } from './models/menu-item.model';


@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: MenuItem[] = [];

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.model = [
      this.createHomeMenu(),
      this.createManagementMenu()
    ];
  }

  private createHomeMenu(): MenuItem {
    return {
      label: this.translationService.translate('APP_MENU.HOME'),
      items: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
      ]
    };
  }

  private createManagementMenu(): MenuItem {
    return {
      label: this.translationService.translate('APP_MENU.MANAGEMENT'),
      items: this.getManagementItems()
    };
  }

  private getManagementItems(): MenuItem[] {
    const roles = this.authService.userProfile.role;
    return [
      ...(roles.includes('ROLE_ORDERS') ? [this.createMenuItem('APP_MENU.ORDERS', 'pi-shopping-cart', ['/pages/orders'])] : []),
      ...(roles.includes('ROLE_PRODUCTS_ADMIN') ? [this.createMenuItem('APP_MENU.PRODUCTS_ADMIN', 'pi-bars', ['/pages/product-administration'])] : []),
      ...(roles.includes('ROLE_PRODUCTS') ? [this.createMenuItem('APP_MENU.PRODUCTS', 'pi-bars', ['/pages/product-user'])] : []),
      ...(roles.includes('ROLE_USERS') ? [this.createMenuItem('APP_MENU.USERS', 'pi-users', ['/pages/users'])] : [])
    ];
  }

  private createMenuItem(labelKey: string, icon: string, routerLink: string[]): MenuItem {
    return {
      label: this.translationService.translate(labelKey),
      icon: `pi pi-fw ${icon}`,
      routerLink
    };
  }
}
