import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, title: 'Dashboard' },
  {
    path: '/login',
    component: LoginComponent,
    title: 'Login',
  },
  { path: '/signup', component: SignupComponent, title: 'Signup' },
  { path: 'products', component: ProductComponent, title: 'Product' },
  { path: '**', component: NotFoundComponent, title: 'NotFound' },
];
