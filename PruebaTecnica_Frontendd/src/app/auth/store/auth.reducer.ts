    import { createReducer, on } from '@ngrx/store';
    import * as AuthActions from './auth.actions';
    import { AuthState, initialAuthState } from './auth.state';

    export const authFeatureKey = 'auth';

    export const authReducer = createReducer(
        initialAuthState,
        on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
        on(AuthActions.loginSuccess, (state, { authResponse }) => ({
            ...state,
            loading: false,
            isAuthenticated: true,
            token: authResponse.token,
            username: authResponse.username
        })),
        on(AuthActions.loginFailure, (state, { error }) => ({
            ...state,
            loading: false,
            isAuthenticated: false,
            error: error
        })),
        on(AuthActions.register, (state) => ({ ...state, loading: true, error: null })),
        on(AuthActions.registerSuccess, (state, { message }) => ({
            ...state,
            loading: false,
            registerSuccessMessage: message
        })),
        on(AuthActions.registerFailure, (state, { error }) => ({
            ...state,
            loading: false,
            error: error
        })),
        on(AuthActions.logout, (state) => ({
            ...state,
            isAuthenticated: false,
            token: null,
            username: null
        })),

        on(AuthActions.loginSuccess, (state, { authResponse }) => ({
            ...state,
            isLoggedIn: true,
            token: authResponse.token, // Access 'token' from 'authResponse'
            loading: false,
            error: null
        })),
        on(AuthActions.logout, (state) => ({
            ...state,
            isLoggedIn: false,
            token: null
        }))
    );

    export function reducer(state: AuthState | undefined, action: any) {
        return authReducer(state, action);
    }