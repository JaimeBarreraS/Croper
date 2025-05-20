import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/auth'; // Asegúrate que este sea tu backend correcto

    constructor(private http: HttpClient) { }

    register(user: { username: string; email: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/register`, user);
    }

    login(credentials: { username: string; password: string }): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
            tap((response: any) => {
                localStorage.setItem('token', response.token);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
}
