import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = `${environment.apiUrl}/products`;

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl)
            .pipe(
                retry(2), // Reintentar la petición hasta 2 veces en caso de error
                catchError(this.handleError)
            );
    }

    getProduct(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    createProduct(product: Product): Observable<Product> {
        return this.http.post<Product>(this.apiUrl, product)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateProduct(product: Product): Observable<Product> {
        return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteProduct(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Ha ocurrido un error en el servidor';

        if (error.error instanceof ErrorEvent) {
            // Error del lado del cliente o problema de red
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // El backend devolvió un código de respuesta de error
            // El response body puede contener pistas sobre lo que salió mal
            errorMessage = `Error del servidor: ${error.status}. ${error.error?.message || error.statusText}`;
        }

        // Registrar el error para depuración
        console.error('Error en ProductService:', errorMessage, error);

        // Devolver un observable con un mensaje de error amigable para el usuario
        return throwError(() => new Error(errorMessage));
    }
}