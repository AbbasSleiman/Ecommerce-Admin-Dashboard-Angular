import { Component } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { NavbarDashboardComponent } from '../../shared/navbar-dashboard/navbar-dashboard.component';
import { AuthenticateService } from '../../guards/authenticate.service';
import { Router } from '@angular/router';
import { ServicesService } from './services.service';
import { Order } from '../../models/Order';
import { Product } from '../../models/Product';
import { response } from 'express';

@Component({
  selector: 'app-dashboard',
  imports: [
    IonButton,
    NavbarDashboardComponent,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  ordersNumber: number = 0;
  productsNumber: number = 0;
  usersNumber: number = 0;
  last5Orders: Order[] = [];
  last5Produdcts: Product[] = [];

  constructor(
    private authService: AuthenticateService,
    private dashboardService: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignNumbers();
    this.assignLastElements();
  }

  // fill numbers variables
  assignNumbers() {
    this.dashboardService.getCategoryNumber('orders').subscribe(response => {
      this.ordersNumber = response;
    });
    this.dashboardService.getCategoryNumber('products').subscribe(response => {
      this.productsNumber = response;
    });
    this.dashboardService.getCategoryNumber('users').subscribe(response => {
      this.usersNumber = response;
    });
  }

  // fill arrays
  assignLastElements() {
    this.dashboardService.getLatestOrders().subscribe(response => {
      this.last5Orders = response;
    });
    this.dashboardService.getLatestProducts().subscribe(response => {
      this.last5Produdcts = response;
    });
  }

  // deAuthenticate the User and navigate to landing
  logout() {
    console.log('te');
    this.authService.clearUserId();
    this.router.navigate(['']);
  }
}
