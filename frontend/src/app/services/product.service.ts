import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const API_URL = 'https://localhost:5001/api/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL);
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${product.id}`);
  }
}
