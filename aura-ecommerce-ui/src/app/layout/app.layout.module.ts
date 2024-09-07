import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './app-menu/app.menu.component';
import { AppMenuitemComponent } from './app-menu/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './app-topbar/app.topbar.component';
import { AppConfigModule } from './config/config.module';
import { AppLayoutComponent } from "./app.layout.component";
import { AppFooterComponent } from './app-footer/app.footer.component';
import { AppSidebarComponent } from './app-sidebar/app.sidebar.component';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppSidebarComponent,
        AppLayoutComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        TooltipModule,
        AppConfigModule,
        ButtonModule,
        DropdownModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
