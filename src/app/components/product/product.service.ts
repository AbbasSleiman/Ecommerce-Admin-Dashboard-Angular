import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  // CRUD Operations
  getProducts() {}
  addProduct() {}
  deleteProduct() {}
  updateProduct() {}
}
