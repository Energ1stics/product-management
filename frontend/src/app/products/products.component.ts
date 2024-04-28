import { Component } from '@angular/core';
import { ReadProductsComponent } from '../components/read-products/read-products.component';
import { CreateProductComponent } from '../components/create-product/create-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReadProductsComponent, CreateProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {}
