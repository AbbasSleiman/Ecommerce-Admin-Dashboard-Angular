import { Component } from '@angular/core';
import { IonButton, IonContent, IonInput } from '@ionic/angular/standalone';
import { NavbarDashboardComponent } from '../../shared/navbar-dashboard/navbar-dashboard.component';
import { ProductService } from './product.service';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [
    IonContent,
    IonButton,
    IonInput,
    NavbarDashboardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {

  productsArray: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignProducts();
  }

  // fill the array of products values
  assignProducts() {
    this.productService.getProducts().subscribe(response => {
      this.productsArray = response;
    });
  }

  // Navigation function
  navigate() {
    this.router.navigate(['products', 'add-product']);
  }


}
