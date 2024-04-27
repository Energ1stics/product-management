import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  products = [
    {
      name: 'Product 1',
      price: 10,
      category: 'Electronics',
      description: 'This is a product description',
    },
    {
      name: 'Product 2',
      price: 20,
      category: 'Electronics',
      description: 'This is a product description',
    },
    {
      name: 'Product 3',
      price: 30,
      category: 'Electronics',
      description: 'This is a product description',
    },
  ];
  title = 'frontend';
}
