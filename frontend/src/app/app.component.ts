import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReadProductsComponent } from './components/read-products/read-products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReadProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
}
