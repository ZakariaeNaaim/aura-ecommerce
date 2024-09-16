import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/aura-ecommerce/models/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/aura-ecommerce/service/product.service';
import { Category } from 'src/app/aura-ecommerce/models/category';
import { TranslationService } from 'src/app/shared/services/translation/translate.service';

@Component({
    templateUrl: './product.component.html',
    providers: [MessageService]
})
export class ProductComponent implements OnInit {

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];
    categories: Category[] = [];

    product: Product = {};

    selectedProducts: Product[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    updateMode: boolean;

    constructor(private productService: ProductService, private messageService: MessageService, private translationService : TranslationService) { }

    ngOnInit() {

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
        this.productService.getCategories().subscribe({
            next:(result)=>{
                this.categories = result.data;
            },error:()=>{

            }
        });
        this.productService.getProducts().subscribe({
            next:(result)=>{
                this.products = result.data;
            },error:()=>{

            }
        });
    }

    openNew() {
        this.product = {};
        this.submitted = false;
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
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        const ids  = this.selectedProducts.map(e=> e.id);
        this.productService.deleteProduct(ids).subscribe({
            next:(res)=>{
              if(res){
                this.products = this.products.filter(val => !this.selectedProducts.includes(val));
                this.selectedProducts = [];
                this.messageService.add({ severity: 'success ', summary: 'Confirmed', detail: this.translationService.translate('PRODUCTS.PRODUCT_DELETED') });
                this.deleteProductsDialog = false;
            
                }
            },
            error:()=>{
              this.messageService.add({ severity: 'error', summary: 'Error', detail:this.translationService.translate('PRODUCTS.CANT_DELETE_PRODUCT') });
            }
          });

    }

    confirmDelete() {
        this.productService.deleteProduct(this.product.id).subscribe({
            next:(res)=>{
              if(res){
                this.products = this.products.filter(val => val.id !== this.product.id);
                this.messageService.add({ severity: 'success ', summary: 'Confirmed', detail: this.translationService.translate('PRODUCTS.PRODUCT_DELETED') });
                this.deleteProductDialog = false;
                this.product = {};
            }
            },
            error:()=>{
              this.messageService.add({ severity: 'error', summary: 'Error', detail:this.translationService.translate('PRODUCTS.CANT_DELETE_PRODUCT') });
            }
          })
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
        if(this.updateMode){
            this.updateProduct();
            this.productDialog = false;
        } else{
            this.createProduct();
        }
    }

   private createProduct(){
        this.submitted = true;

        if (this.product.name?.trim()) {
                this.product.categoryId = Number(this.product.categoryId)??null;
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.productService.saveProduct(this.product).subscribe(
                    {
                        next : (res)=>{
                            if(res){
                                this.products.push(this.product);
                                this.messageService.add({ severity: 'success', summary: 'Successful', detail: this.translationService.translate('PRODUCTS.PRODUCT_CREATED'), life: 3000 });
                            }
                        },
                        error : () => {
                            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.translationService.translate('PRODUCTS.CANT_CREATE_PRODUCT') });
                        }
                    }
                );
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
    }

    private updateProduct() {
        this.productDialog = true;
        this.productService.updateProduct(this.product).subscribe({
            next:(res)=>{
              if(res){
                this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: this.translationService.translate('PRODUCTS.PRODUCT_UPDATED')});
              }
            },
            error:()=>{
              this.messageService.add({ severity: 'error', summary: 'Error', detail: this.translationService.translate('PRODUCTS.CANT_UPDATE_PRODUCT') });
            }
          });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
