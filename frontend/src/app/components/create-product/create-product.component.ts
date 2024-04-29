import { Component, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../models/product';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent {
  constructor(private productService: ProductService) {}

  @ViewChild(ProductFormComponent) productForm?: ProductFormComponent;

  apiPending = false;
  apiError = false;

  onSubmit(product: Omit<Product, 'id'>) {
    this.apiPending = true;

    this.productService.createProduct(product).subscribe({
      error: () => {
        this.apiPending = false;
        this.apiError = true;
      },
      complete: () => {
        this.apiError = false;
        this.apiPending = false;
        this.productForm?.reset();
      },
    });
  }
}
