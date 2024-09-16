import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ResponseGenericResult } from 'src/app/shared/models/response-generic-result/response-generic-result.model';
import { Category } from '../models/category';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
    private baseUrl = environment.apiUrl + '/products';

    constructor(private http: HttpClient) {}


    getProducts(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    saveProduct(product: Product) {
        const formData =this.fillFormData(product,false);
        return this.http.post(this.baseUrl, formData);
    }
    
    updateProduct(product: Product): Observable<ResponseGenericResult<boolean>> {
        const formData =this.fillFormData(product,true);
        return this.http.put<ResponseGenericResult<boolean>>(`${this.baseUrl}`, formData);
    }

    deleteProduct(ids: string[] | string): Observable<ResponseGenericResult<boolean>> {
        return this.http.delete<ResponseGenericResult<boolean>>(`${this.baseUrl}/${ids}`);
    }



    private fillFormData(product: Product,isUpdate:boolean){
        const formData = new FormData();
        if (isUpdate)
        formData.append('id', product.id);

        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('price', product.price.toString());
        formData.append('quantity', product.quantity.toString());
        formData.append('categoryId', product.categoryId.toString());
        formData.append('image', product.image);
        // formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
        return formData
    }
    
    getCategories(): Observable<any> {
        const url = `http://localhost:8089/categories/getAllCategories`;
        return this.http.get(url);
    }

    getProductsSmall() {
        return this.http
            .get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

   

    getProductsMixed() {
        return this.http
            .get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }

    getProductsWithOrdersSmall() {
        return this.http
            .get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then((res) => res.data as Product[])
            .then((data) => data);
    }
}
