import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-read-products',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent],
  templateUrl: './read-products.component.html',
  styleUrl: './read-products.component.css',
})
export class ReadProductsComponent {
  constructor(private productService: ProductService) {}

  products: Product[] = [];

  isDeleteModalOpen = false;
  focusedProduct: Product | null = null;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  deleteProduct(product: Product): void {
    this.focusedProduct = product;
    this.isDeleteModalOpen = true;
  }

  confirmDeleteProduct(): void {
    if (!this.focusedProduct) {
      return;
    }
    this.productService.deleteProduct(this.focusedProduct).subscribe(() => {
      this.getProducts();
      this.closeModal();
    });
  }

  closeModal(): void {
    this.isDeleteModalOpen = false;
  }
}
