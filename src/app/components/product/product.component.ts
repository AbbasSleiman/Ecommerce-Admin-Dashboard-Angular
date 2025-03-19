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
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption,
    NavbarDashboardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  productsArray: Product[] = [];
  productDetails: Product | null = {
    id: 0,
    name: '',
    category: '',
    price: 0,
  };

  // create a search form Group
  searchProductForm = new FormGroup({
    item_name: new FormControl<string>('', [Validators.required]),
  });

  // create an edit Form Group
  editProductForm = new FormGroup({
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

  // Retrieve item data
  updateProductInfo() {}

  // submit Search Function to retrieve item data
  submitSearch() {
    const itemName = this.searchProductForm.value.item_name?.trim();
    this.productService.getProductByName(itemName).subscribe(response => {
      this.productDetails = response;
      this.editProductForm.value.name = this.productDetails?.name;
      this.editProductForm.value.category = this.productDetails?.category;
      this.editProductForm.value.price = this.productDetails?.price;
      console.log(this.editProductForm.value.category);
    });
  }

  // Navigation function
  navigate() {
    this.router.navigate(['products', 'add-product']);
  }
}
