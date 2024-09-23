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
    loading = true;

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private translationService: TranslationService
    ) { }

    ngOnInit() {
        this.loadProducts();
        this.initializeSortOptions();
    }

    private loadProducts() {
        this.productService.getProducts().subscribe({
            next: (result) => this.products = result,
            error: () => this.showMessage('error', 'Error', this.translationService.translate('PRODUCTS.CANT_LOAD_PRODUCTS')),
            complete: () => this.loading = false
        });
    }

    private initializeSortOptions() {
        this.sortOptions = [
            { label: 'Price High to Low', value: '!price' },
            { label: 'Price Low to High', value: 'price' }
        ];
    }

    onSortChange(event: any) {
        const value = event.value;
        this.sortOrder = value.startsWith('!') ? -1 : 1;
        this.sortField = value.replace('!', '');
    }

    onFilter(dv: DataView, event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        dv.filter(filterValue);
    }

    private showMessage(severity: string, summary: string, detail: string, life?: number) {
        this.messageService.add({
            severity,
            summary,
            detail,
            ...(life ? { life } : {})
        });
    }
}
