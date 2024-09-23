import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrdersService } from './services/orders.service';
import { AuthService } from 'src/app/aura-ecommerce/core/services/auth.service';
import { Order } from './models/order.model';
import { ResponseGenericResult } from 'src/app/shared/models/response-generic-result/response-generic-result.model';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
    templateUrl: './orders.component.html',
    providers: [MessageService]
})
export class OrdersComponent implements OnInit {
    orderDialog = false;
    deleteOrderDialog = false;
    deleteOrdersDialog = false;
    orders: Order[] = [];
    order!: Order; 
    selectedOrders: Order[] = [];
    submitted = false;
    cols: any[] = [];
    loading = true;

    constructor(
        private ordersService: OrdersService,
        private messageService: MessageService,
        private authService: AuthService,
        private translationService: TranslationService
    ) {}

    ngOnInit(): void {
        this.cols = [
            { field: 'id', header: 'Code' },
            { field: 'reference', header: 'Reference' },
            { field: 'totalCommand', header: 'Total Command' },
            { field: 'etat', header: 'Status' },
            { field: 'orderDate', header: 'Order Date' }
        ];
        this.loadOrders();
    }

    private loadOrders(): void {
        this.ordersService.getOrdersByUserId(this.authService.userProfile.id).subscribe({
            next: (res: ResponseGenericResult<Order[]>) => this.orders = res.data,
            error: () => this.showMessage('error', 'Error', this.translationService.translate('PRODUCTS.CANT_CREATE_PRODUCT')),
            complete: () => this.loading = false
        });
    }

    onGlobalFilter(table: Table, event: Event): void {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    private showMessage(severity: string, summary: string, detail: string, life?: number): void {
        this.messageService.add({ severity, summary, detail, life });
    }
}
