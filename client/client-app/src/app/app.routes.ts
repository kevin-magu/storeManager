import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { Orders } from './components/orders/orders';
import { AddProduct } from './components/add-product/add-product';
import { EditProduct } from './components/edit-product/edit-product';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'products', component: Products },
  { path: 'orders', component: Orders },
  { path: 'add-product', component: AddProduct },
  { 
    path: 'edit-product/:id', 
    component: EditProduct,
    providers: [
      // This disables SSR for this route
      { provide: 'PRERENDER', useValue: false }
    ]
  },
  { path: '**', redirectTo: '/login' }
];