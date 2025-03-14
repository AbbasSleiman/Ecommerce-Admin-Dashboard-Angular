import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { NavbarDashboardComponent } from '../../../shared/navbar-dashboard/navbar-dashboard.component';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../../../models/Product';
import { ServicesService } from '../../dashboard/services.service';
import { response } from 'express';

@Component({
  selector: 'app-product-add',
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
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  itemNumbers: number = 0;

  // create a formGroup with its controls and validators
  addProductForm = new FormGroup({
    id: new FormControl<number>(0, [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    category: new FormControl<string>('', [Validators.required]),
    price: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(10000),
    ]),
  });

  constructor(
    private productService: ProductService,
    private dashboardService: ServicesService
  ) {}

  // Submit function
  submitAddProduct() {
    this.dashboardService.getCategoryNumber('products').subscribe(response => {
      this.itemNumbers = response;
    });
    console.log(this.itemNumbers);

    const product: Product = {
      id: (this.itemNumbers++),
      name: this.addProductForm.value.name!,
      category: this.addProductForm.value.category!,
      price: this.addProductForm.value.price!,
    };
    if (this.addProductForm.valid) {
      this.productService.addProduct(product).subscribe();
    }
  }
}
