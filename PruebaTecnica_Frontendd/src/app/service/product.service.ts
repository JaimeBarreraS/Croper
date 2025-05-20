// product.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiResponse, PaginatedResponse, Product } from '../interface/interfaces';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private apiUrl = `${environment.apiUrl}/productos`;

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl)
            .pipe(catchError(this.handleError));
    }
    

    getProductById(id: number): Observable<ApiResponse<Product>> {
        return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    createProduct(product: Product): Observable<ApiResponse<Product>> {
        return this.http.post<ApiResponse<Product>>(this.apiUrl, product)
            .pipe(catchError(this.handleError));
    }

    updateProduct(product: Product): Observable<ApiResponse<Product>> {
        return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/${product.id}`, product)
            .pipe(catchError(this.handleError));
    }

    deleteProduct(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Ha ocurrido un error desconocido';

        if (error.error instanceof ErrorEvent) {
            // Error del cliente
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Error del servidor
            if (error.error && error.error.message) {
                errorMessage = error.error.message;
            } else {
                switch (error.status) {
                    case 400:
                        errorMessage = 'Solicitud incorrecta';
                        break;
                    case 401:
                        errorMessage = 'No autorizado';
                        break;
                    case 404:
                        errorMessage = 'Recurso no encontrado';
                        break;
                    case 500:
                        errorMessage = 'Error interno del servidor';
                        break;
                }
            }
        }

        return throwError(() => new Error(errorMessage));
    }
}