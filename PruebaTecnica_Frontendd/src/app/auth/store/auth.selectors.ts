import { createFeatureSelector, createSelector } from '@ngrx/store';
    import { AuthState } from './auth.state';

    export const selectAuthState = createFeatureSelector<AuthState>('auth'); // Nombre de la característica en StoreModule

    export const selectIsAuthenticated = createSelector(
        selectAuthState,
        (state: AuthState) => state.isAuthenticated
    );

    export const selectAuthToken = createSelector(
        selectAuthState,
        (state: AuthState) => state.token
    );

    export const selectAuthUsername = createSelector(
        selectAuthState,
        (state: AuthState) => state.username
    );

    export const selectAuthLoading = createSelector(
        selectAuthState,
        (state: AuthState) => state.loading
    );

    export const selectAuthError = createSelector(
        selectAuthState,
        (state: AuthState) => state.error
    );

    export const selectRegisterSuccessMessage = createSelector(
        selectAuthState,
        (state: AuthState) => state.registerSuccessMessage
    );

    export const selectIsLoggedIn = createSelector(
        selectAuthState,
        (authState) => authState.isLoggedIn
    );