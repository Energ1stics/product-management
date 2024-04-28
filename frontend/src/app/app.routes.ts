import { Routes } from '@angular/router';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/edit/:id', component: EditProductComponent },
  { path: '**', redirectTo: '/products' },
];
