import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { ResponseGenericResult } from 'src/app/shared/models/response-generic-result/response-generic-result.model';
import { Category } from '../models/category';

@Injectable()
export class ProductService {

    constructor(private http: HttpClient) { }

    saveProduct(product : Product){
        const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('categoryId', product.categoryId.toString());
    // formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    formData.append('image', product.image);
        const url = `http://localhost:8089/products/saveProduct`;
        return this.http.post(url,formData);
    }
    getCategories(): Observable<any>{
        const url = `http://localhost:8089/categories/getAllCategories`;
        return this.http.get(url);
    }
    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProducts(): Observable<any>{
        const url = `http://localhost:8089/products/getProducts`;
        return this.http.get(url);
        
        // return this.http.get<any>('assets/demo/data/products.json')
        //     .toPromise()
        //     .then(res => res.data as Product[])
        //     .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
            .toPromise()
            .then(res => res.data as Product[])
            .then(data => data);
    }
}
