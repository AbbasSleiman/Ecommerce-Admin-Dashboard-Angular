import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../models/Order';
import { environment } from '../../../environments/environment.development';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // CRUD Operations
  // fetch all products
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`).pipe(
      map(orders => {
        return orders;
      })
    );
  }

  // sending a post request to server
  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${environment.apiUrl}/orders`, order, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  
  deleteOrder() {}
  updateOrder() {}
}
