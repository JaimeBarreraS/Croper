import { HttpErrorResponse } from '@angular/common/http';

export interface AuthState {
    isAuthenticated: boolean;
    isLoggedIn: boolean; // Consolidated property
    token: string | null;
    username: string | null;
    loading: boolean;
    error: HttpErrorResponse | null;
    registerSuccessMessage: string | null;
}

export const initialAuthState: AuthState = {
    isAuthenticated: false,
    isLoggedIn: false, // Added this property
    token: null,
    username: null,
    loading: false,
    error: null,
    registerSuccessMessage: null
};