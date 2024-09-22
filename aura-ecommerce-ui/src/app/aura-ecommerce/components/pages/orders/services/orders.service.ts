import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../../../models/product';
import { Observable } from 'rxjs';
import { ResponseGenericResult } from 'src/app/shared/models/response-generic-result/response-generic-result.model';
import { environment } from 'src/environments/environment';
import { Order } from '../models/order.model';

@Injectable()
export class OrdersService {
    private baseUrl = environment.apiUrl + '/orders';

    constructor(private http: HttpClient) {}


    getOrders(): Observable<any> {
        return this.http.get(this.baseUrl);
    }

    getOrdersByUserId(userId:number): Observable<any> {
        return this.http.get(`${this.baseUrl}/${userId}`);
    }

    saveOrder(order: Order) {
        return this.http.post(this.baseUrl, order);
    }
    
    updateOrder(order: Product): Observable<ResponseGenericResult<boolean>> {
        return this.http.put<ResponseGenericResult<boolean>>(`${this.baseUrl}`, order);
    }

    deleteOrder(ids: string[] | string): Observable<ResponseGenericResult<boolean>> {
        return this.http.delete<ResponseGenericResult<boolean>>(`${this.baseUrl}/${ids}`);
    }

}
