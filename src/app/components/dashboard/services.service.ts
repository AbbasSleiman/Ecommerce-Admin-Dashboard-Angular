import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private http: HttpClient) {}

  getOrdersNumber() {}

  getProductsNumber() {}

  getUsersNumber() {}

  // get latest 5 products
  getLatestProducts() {}

  // get latest 5 orders
  getLatestOrders() {}
  
}
