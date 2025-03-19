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

  // return Item details by name
  getProductByName(
    name: string | null | undefined
  ): Observable<Product | null> {
    return this.http
      .get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(
        map(products => products.find(product => product.name === name) || null)
      );
  }

  // fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`).pipe(
      map(products => {
        return products;
      })
    );
  }

  // sending a post request to server to add a product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, product, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  deleteProduct() {}
  updateProduct() {}
}
