import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CreateProduct } from '../models/createProduct';

const API_URL = 'https://localhost:5001/api/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL);
  }

  createProduct(product: CreateProduct): Observable<void> {
    return this.http.post<void>(API_URL, product);
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${product.id}`);
  }
}
