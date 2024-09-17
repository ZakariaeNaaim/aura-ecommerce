import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/aura-ecommerce/models/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/aura-ecommerce/service/product.service';
import { Category } from 'src/app/aura-ecommerce/models/category';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
    templateUrl: './product-user.component.html',
    providers: [MessageService]
})
export class ProductUserComponent implements OnInit {
    productDialog: boolean = false;
    deleteProductDialog: boolean = false;
    deleteProductsDialog: boolean = false;

    products: Product[] = [];
    categories: Category[] = [];
    product: Product = {category:{id:'',libelle:''}};
    selectedProducts: Product[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    updateMode: boolean;
    loading = true;

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private translationService: TranslationService
    ) {}

    ngOnInit() {
        this.initializeColumns();
        this.initializeStatuses();
        this.loadCategories();
        this.loadProducts();
    }

    private initializeColumns() {
        this.cols = [
            { field: 'product', header: this.translationService.translate('PRODUCTS.PRODUCT') },
            { field: 'price', header:this.translationService.translate('PRODUCTS.PRICE') },
            { field: 'category', header:this.translationService.translate('PRODUCTS.CATEGORY') },
            { field: 'rating', header:this.translationService.translate('PRODUCTS.REVIEWS')  },
            { field: 'inventoryStatus', header: this.translationService.translate('PRODUCTS.STATUS') }
        ];
    }

    private initializeStatuses() {
        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    private loadCategories() {
        this.productService.getCategories().subscribe({
            next: (result) => {
                this.categories = result.data;
            },
            error: () => {
                this.showMessage('error', 'Error', this.translationService.translate('PRODUCTS.CANT_LOAD_CATEGORIES'));
            }
        });
    }

    private loadProducts() {
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
    }

    openNew() {
        this.resetProduct();
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
        this.updateMode = true;
    }

    deleteProduct(product: Product) {
        this.product = { ...product };
        this.deleteProductDialog = true;
    }

    confirmDeleteSelected() {
        const ids = this.selectedProducts.map(e => e.id);
        
        this.productService.deleteProduct(ids).subscribe({
            next: (res) => {
                if (res) {
                    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                    this.selectedProducts = [];
                    this.showMessage('success', 'Confirmed', this.translationService.translate('PRODUCTS.PRODUCT_DELETED'));
                    this.deleteProductsDialog = false;
                }
            },
            error: () => {
                this.showMessage('error', 'Error', this.translationService.translate('PRODUCTS.CANT_DELETE_PRODUCT'));
            }
        });
    }

    confirmDelete() {
        this.productService.deleteProduct(this.product.id).subscribe({
            next: (res) => {
                if (res) {
                    this.products = this.products.filter(val => val.id !== this.product.id);
                    this.showMessage('success', 'Confirmed', this.translationService.translate('PRODUCTS.PRODUCT_DELETED'));
                    this.deleteProductDialog = false;
                    this.resetProduct();
                }
            },
            error: () => {
                this.showMessage('error', 'Error', this.translationService.translate('PRODUCTS.CANT_DELETE_PRODUCT'));
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    onFileChange(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.product.image = file;
        }
    }

    saveProduct() {
        if (this.updateMode) {
            this.updateProduct();
        } else {
            this.createProduct();
        }
        // Close the dialog after saving
        this.productDialog = false;
    }

   private createProduct() {
       if (!this.isValidProduct()) return;
       // Save product
       this.productService.saveProduct(this.product).subscribe({
           next: (res) => {
               if (res) {
                   this.loadProducts();
                   this.showMessage('success', 'Successful', 
                       this.translationService.translate('PRODUCTS.PRODUCT_CREATED'), 3000);
               }
           },
           error: () => {
               this.showMessage('error', 'Error', 
                   this.translationService.translate('PRODUCTS.CANT_CREATE_PRODUCT'));
           }
       });

       // Reset product data
       this.resetProduct();
   }

   private updateProduct() {
       // Update product
       this.productService.updateProduct(this.product).subscribe({
           next: (res) => {
               if (res) {
                   this.showMessage('success', 'Confirmed',
                       this.translationService.translate('PRODUCTS.PRODUCT_UPDATED'));
                    this.loadProducts();
               }
           },
           error: () => {
               this.showMessage('error', 'Error',
                   this.translationService.translate('PRODUCTS.CANT_UPDATE_PRODUCT'));
           }
       });
   }

   private isValidProduct(): boolean {
       return !!this.product.name?.trim();
   }

   private resetProduct() {
       this.product = {category:{id:'',libelle:''}};
       this.submitted = false;
   }

   private showMessage(severity: string, summary: string, detail: string, life?: number) {
       const messageDetails = { severity, summary, detail };
       if (life) messageDetails['life'] = life;
       this.messageService.add(messageDetails);
   }

   findIndexById(id: string): number {
       return this.products.findIndex(product => product.id === id);
   }

   onGlobalFilter(table: Table, event: Event) {
       table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
   }
}