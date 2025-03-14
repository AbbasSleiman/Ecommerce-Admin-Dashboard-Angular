import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../../models/Product';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // CRUD Operations

  // fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
      map(products => {
        return products;
      })
    );
  }

  // sending a post request to server
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteProduct() {}
  updateProduct() {}
}
