import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { ServicesService } from '../../dashboard/services.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Order } from '../../../models/Order';
import {
  IonContent,
  IonButton,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { NavbarDashboardComponent } from '../../../shared/navbar-dashboard/navbar-dashboard.component';

@Component({
  selector: 'app-order-add',
  imports: [
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    NavbarDashboardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.css',
})
export class OrderAddComponent {
  orderNumbers: number = 0;

  // create a formGroup with its controls and validators
  addOrderForm = new FormGroup({
    id: new FormControl<number>(0, [Validators.required]),
    userId: new FormControl<number>(0, [Validators.required]),
    product: new FormControl<string>('', [Validators.required]),
    quantity: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
    status: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private orderService: OrderService,
    private dashboardService: ServicesService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getCategoryNumber('orders').subscribe(response => {
      this.orderNumbers = response;
    });
  }
  // Submit function
  submitAddOrder() {
    if (this.addOrderForm.valid) {
      const order: Order = {
        id: this.orderNumbers++,
        userId: this.addOrderForm.value.userId!,
        product: this.addOrderForm.value.product!,
        quantity: this.addOrderForm.value.quantity!,
        status: this.addOrderForm.value.status!,
      };
      this.orderService.addOrder(order).subscribe();
    }
  }
}
