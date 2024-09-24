import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { ProductService } from 'src/app/aura-ecommerce/components/pages/product-administration/services/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardService } from './services/dashboard.service';
import { AuthService } from 'src/app/aura-ecommerce/core/services/auth.service';
import { Order } from '../orders/models/order.model';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    orders: Order[] = [];
    expenses = 0;
    items: MenuItem[] = [];
    chartData: any;
    chartOptions: any;
    private subscription!: Subscription;

    constructor(
        public layoutService: LayoutService,
        private dashboardService: DashboardService,
        private authService: AuthService
    ) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe(() => this.initChart());
    }

    ngOnInit(): void {
        this.loadData();
    }

    private loadData(): void {
        this.getOrders();
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    private getOrders(): void {
        this.dashboardService.getInfos(this.authService.userProfile.id).subscribe({
            next: (res: Order[]) => {
                this.orders = res;
                this.expenses = res.reduce((sum, order) => sum + order.totalCommand, 0);
            },
            error: () => console.error('Failed to fetch orders')
        });
    }

    private initChart(): void {
        const styles = getComputedStyle(document.documentElement);
        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: styles.getPropertyValue('--bluegray-700'),
                    borderColor: styles.getPropertyValue('--bluegray-700'),
                    tension: 0.4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: styles.getPropertyValue('--green-600'),
                    borderColor: styles.getPropertyValue('--green-600'),
                    tension: 0.4
                }
            ]
        };
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: styles.getPropertyValue('--text-color')
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: styles.getPropertyValue('--text-color-secondary') },
                    grid: { color: styles.getPropertyValue('--surface-border'), drawBorder: false }
                },
                y: {
                    ticks: { color: styles.getPropertyValue('--text-color-secondary') },
                    grid: { color: styles.getPropertyValue('--surface-border'), drawBorder: false }
                }
            }
        };
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
