import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Observable } from 'rxjs';
    import { AuthRequest, AuthResponse } from '../models/auth.model'; // Crear modelos

    @Injectable({
        providedIn: 'root'
    })
    export class AuthService {
        private baseUrl = 'http://localhost:8080/api/auth'; // URL del backend

        constructor(private http: HttpClient) {}

        login(authRequest: AuthRequest): Observable<AuthResponse> {
            return this.http.post<AuthResponse>(`${this.baseUrl}/login`, authRequest);
        }

        register(authRequest: AuthRequest): Observable<string> {
            return this.http.post<string>(`${this.baseUrl}/register`, authRequest, { responseType: 'text' as 'json' });
        }
    }