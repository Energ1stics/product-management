import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-read-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './read-products.component.html',
  styleUrl: './read-products.component.css',
})
export class ReadProductsComponent {
  constructor(private productService: ProductService) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product).subscribe(() => {
      this.getProducts();
    });
  }
}
