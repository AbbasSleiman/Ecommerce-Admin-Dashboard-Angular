import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonButton, IonInput } from '@ionic/angular/standalone';
import { NavbarDashboardComponent } from '../../shared/navbar-dashboard/navbar-dashboard.component';
import { OrderService } from './order.service';
import { Router } from '@angular/router';
import { Order } from '../../models/Order';

@Component({
  selector: 'app-order',
  imports: [
    IonContent,
    IonButton,
    IonInput,
    NavbarDashboardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  ordersArray: Order[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignOrders();
  }

  // fill the array of products values
  assignOrders() {
    this.orderService.getOrders().subscribe(response => {
      this.ordersArray = response;
    });
  }

  // Navigation function
  navigate() {
    this.router.navigate(['orders', 'add-order']);
  }
}
