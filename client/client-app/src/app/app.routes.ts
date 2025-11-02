import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { Orders } from './components/orders/orders';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'products', component: Products },
  { path: 'orders', component: Orders },
  { path: '**', redirectTo: '/login' }
];