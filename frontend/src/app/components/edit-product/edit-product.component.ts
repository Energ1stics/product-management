import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../models/product';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
    ProductFormComponent,
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  apiPending = false;
  apiError = false;

  originalProduct?: Product;

  categories: Category[] = [];

  ngOnInit() {
    const productId = parseInt(this.route.snapshot.paramMap.get('id') || '');
    this.productService.getProduct(productId).subscribe((product) => {
      this.originalProduct = product;
    });
  }

  onSubmit(changedProduct: Omit<Product, 'id'>) {
    if (!this.originalProduct) {
      return;
    }

    this.apiPending = true;

    this.productService
      .updateProduct({ ...changedProduct, id: this.originalProduct.id })
      .subscribe({
        error: () => {
          this.apiPending = false;
          this.apiError = true;
        },
        complete: () => {
          this.apiError = false;
          this.apiPending = false;
          this.router.navigate(['/products']);
        },
      });
  }
}
