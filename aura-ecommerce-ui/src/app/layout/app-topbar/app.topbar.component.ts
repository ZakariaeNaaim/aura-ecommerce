import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "../service/app.layout.service";
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrl:'./app.topbar.component.scss'
})
export class AppTopBarComponent{

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, public authService :AuthService,public router : Router) { }


    onLogout(): void {
        this.authService.logout();
        this.router.navigate(['/landing']);
      }
      
}
