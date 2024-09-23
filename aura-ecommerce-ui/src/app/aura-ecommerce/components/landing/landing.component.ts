import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { SelectItemDropDown } from 'src/app/shared/models/p-dropdown/select-item-dropdown.model';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

  languages: SelectItemDropDown[] = [
    { name: 'English', code: 'en' },
    { name: 'Deutsch', code: 'de' }
  ];

  selectedLanguage: SelectItemDropDown = { name: 'English', code: 'en' };

  constructor(
    private translateService: TranslationService,
    public layoutService: LayoutService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.initializeSelectedLanguage();
  }

  private initializeSelectedLanguage(): void {
    const currentLanguageCode = this.translateService.getCurrentLanguage() || 'en';
    this.selectedLanguage = this.languages.find(lang => lang.code === currentLanguageCode) || this.selectedLanguage;
  }

  changeLanguage(event: { value: SelectItemDropDown }): void {
    const selectedCode = event?.value?.code;
    if (selectedCode) {
      this.translateService.setCurrentLanguage(selectedCode);
      this.selectedLanguage = this.languages.find(lang => lang.code === selectedCode) || this.selectedLanguage;
      window.location.reload();
    }
  }
}
