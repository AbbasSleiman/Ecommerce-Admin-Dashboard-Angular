import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProductComponent } from './components/product/product.component';
import { OrderComponent } from './components/order/order.component';
import { LandingComponent } from './landing/landing.component';
import { authenticateGuard } from './guards/authenticate.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'Landing Page' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  { path: 'signup', component: SignupComponent, title: 'Signup' },
  { path: 'products', component: ProductComponent, title: 'Products' },
  { path: 'orders', component: OrderComponent, title: 'Products' },

  // a wildcard route, if it doesn't exist, the application will render this route
  // crucial to be the last one
  { path: '**', component: NotFoundComponent, title: 'Not Found' },
];
