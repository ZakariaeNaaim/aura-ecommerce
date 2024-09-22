import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/aura-ecommerce/models/product';
import { MessageService, SelectItem } from 'primeng/api';
import { ProductService } from 'src/app/aura-ecommerce/components/pages/product-administration/services/product.service';
import { DataView } from 'primeng/dataview';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
    templateUrl: './product-user.component.html',
    providers: [MessageService]
})
export class ProductUserComponent implements OnInit {
    products: Product[] = [];

    sortOptions: SelectItem[] = [];

    sortOrder: number = 0;

    sortField: string = '';

    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    loading = true;

    constructor(private productService: ProductService,private messageService : MessageService, private translationService:TranslationService) { }

    ngOnInit() {
        this.productService.getProducts().subscribe({
            next: (result) => {
                this.products = result;
            },
            error: () => {
                this.showMessage('error', 'Error', this.translationService.translate('PRODUCTS.CANT_LOAD_PRODUCTS'));
            },
            complete : () => {
                this.loading = false;
            }
        });
        this.sourceCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.targetCities = [];

        this.orderCities = [
            { name: 'San Francisco', code: 'SF' },
            { name: 'London', code: 'LDN' },
            { name: 'Paris', code: 'PRS' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Berlin', code: 'BRL' },
            { name: 'Barcelona', code: 'BRC' },
            { name: 'Rome', code: 'RM' }];

        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    onSortChange(event: any) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
        } else {
            this.sortOrder = 1;
            this.sortField = value;
        }
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }
 
    private showMessage(severity: string, summary: string, detail: string, life?: number) {
        const messageDetails = { severity, summary, detail };
        if (life) messageDetails['life'] = life;
        this.messageService.add(messageDetails);
    }
}