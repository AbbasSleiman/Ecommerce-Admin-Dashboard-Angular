import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // CRUD Operations
  getOrders() {}
  addOrder() {}
  deleteOrder() {}
  updateOrder() {}
}
