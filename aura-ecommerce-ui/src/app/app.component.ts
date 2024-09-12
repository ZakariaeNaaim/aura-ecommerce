import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { TranslationService } from './shared/services/translation/translate.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(
        private primengConfig: PrimeNGConfig,
        public translateService: TranslationService
    ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;

        const defaultLanguageCode = 'en';

        const anyLanguageExists = this.translateService.anyLanguageExists();

        if(!anyLanguageExists)
        this.translateService.setCurrentLanguage(defaultLanguageCode);
    }
}