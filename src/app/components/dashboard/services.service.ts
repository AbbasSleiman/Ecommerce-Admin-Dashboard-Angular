import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../models/Product';
import { Order } from '../../models/Order';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  // getProductsNumber(): Observable<number> {
  // }

  // getOrdersNumber(): Observable<number> {
  // }

  // getUsersNumber(): Observable<number> {
  // }

  // Instead of doing a function for each, we make one and pass a category parameter
  // Applied DRY
  getCategoryNumber(category: string): Observable<number> {
    return this.http
      .get<number[]>(`${environment.apiUrl}/${category}`)
      .pipe(map(products => products.length));
  }


  // get last 5 Orders
  getLatestOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiUrl}/orders`).pipe(
      map(elements => {
        return elements.slice(Math.max(elements.length - 5, 0));
      })
    );
  }

  // get last 5 Products
  getLatestProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
      map(elements => {
        return elements.slice(Math.max(elements.length - 5, 0));
      })
    );
  }
}
