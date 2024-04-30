import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReadProductsComponent } from './components/read-products/read-products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReadProductsComponent,
    CreateProductComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
