import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';
import { Router } from '@angular/router';
import { SelectItemDropDown } from 'src/app/shared/models/p-dropdown/select-item-dropdown.model';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrl:'./app.topbar.component.scss'
})
export class AppTopBarComponent{


    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    items!: MenuItem[];

    languages: SelectItemDropDown[] = [
        { name: 'English', code: 'en' },
        { name: 'Deutsch', code: 'de' }
    ];

    selectedLanguage: SelectItemDropDown = { name: 'English', code: 'en' };

    constructor(
        private translateService: TranslationService,
        public layoutService: LayoutService,
        public authService :AuthService,
        public router: Router
    ) {
        const currentLanguageCode = this.translateService.getCurrentLanguage() || 'en';
        this.selectedLanguage = this.languages.find(lang => lang.code === currentLanguageCode) || this.selectedLanguage;
    }

    changeLanguage(event: any) {
        const selectedCode = event?.value?.code;
        this.translateService.setCurrentLanguage(selectedCode);
        this.selectedLanguage = this.languages.find(lang => lang.code === selectedCode) || this.selectedLanguage;
        window.location.reload();
    }

    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/landing']);
    }
}
