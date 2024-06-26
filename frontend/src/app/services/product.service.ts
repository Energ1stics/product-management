import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:5000/api/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(API_URL);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${API_URL}/${id}`);
  }

  createProduct(product: Omit<Product, 'id'>): Observable<void> {
    return this.http.post<void>(API_URL, product);
  }

  updateProduct(product: Product): Observable<void> {
    return this.http.put<void>(`${API_URL}/${product.id}`, product);
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${product.id}`);
  }
}
