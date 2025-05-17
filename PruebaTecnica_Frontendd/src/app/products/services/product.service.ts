import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { Product } from '../models/product.model';

    @Injectable({
        providedIn: 'root'
    })
    export class ProductService {
        private baseUrl = 'http://localhost:8080/api/productos'; // URL del backend

        constructor(private http: HttpClient) {}

        getProducts(): Observable<Product[]> {
            return this.http.get<Product[]>(this.baseUrl);
        }

        getProductById(id: number): Observable<Product> {
            return this.http.get<Product>(`${this.baseUrl}/${id}`);
        }

        createProduct(product: Product): Observable<Product> {
            return this.http.post<Product>(this.baseUrl, product);
        }

        updateProduct(id: number, product: Product): Observable<Product> {
            return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
        }

        deleteProduct(id: number): Observable<any> {
            return this.http.delete(`${this.baseUrl}/${id}`);
        }

        getProductsByCategory(category: string): Observable<Product[]> {
            return this.http.get<Product[]>(`${this.baseUrl}/categoria/${category}`);
        }
    }