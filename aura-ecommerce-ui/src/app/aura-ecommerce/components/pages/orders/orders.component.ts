import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OrdersService } from './services/orders.service';
import { AuthService } from 'src/app/aura-ecommerce/auth/services/auth.service';
import { Order } from './models/order.model';
import { ResponseGenericResult } from 'src/app/shared/models/response-generic-result/response-generic-result.model';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
    templateUrl: './orders.component.html',
    providers: [MessageService]
})
export class OrdersComponent implements OnInit {

    orderDialog: boolean = false;

    deleteOrderDialog: boolean = false;

    deleteOrdersDialog: boolean = false;

    orders: Order[] = [];

    order: Order ;

    selectedOrders: Order[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    loading=true;

    constructor(private ordersService: OrdersService, private messageService: MessageService,private authService:AuthService,
        private translationService:TranslationService
    ) { }

    ngOnInit() {

        this.cols = [
            { field: 'id', header: 'Code' },
            { field: 'reference', header: 'Reference' },
            { field: 'totalCommand', header: 'Total Command' },
            { field: 'etat', header: 'Status' },
            { field: 'orderDate', header: 'Order Date' }
        ];
    
        this.getOrders();
    }


    getOrders():void{
        this.ordersService.getOrdersByUserId(this.authService.userProfile.id).subscribe({
            next :(res:ResponseGenericResult<Order[]>) => {
                this.orders = res.data;
            },
            error :()=>{
                this.showMessage('error', 'Error', 
                    this.translationService.translate('PRODUCTS.CANT_CREATE_PRODUCT'));
            },
            complete : () =>{
                this.loading=false;
            }
        })
    }

    onGlobalFilter(table: Table, event: Event) :void{
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    private showMessage(severity: string, summary: string, detail: string, life?: number) {
        const messageDetails = { severity, summary, detail };
        if (life) messageDetails['life'] = life;
        this.messageService.add(messageDetails);
    }
}
