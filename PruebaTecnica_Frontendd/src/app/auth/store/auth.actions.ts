import { createAction, props } from '@ngrx/store';
    import { AuthRequest, AuthResponse } from '../models/auth.model';
    import { HttpErrorResponse } from '@angular/common/http';

    export const login = createAction(
        '[Auth] Login',
        props<{ authRequest: AuthRequest }>()
    );

    export const loginSuccess = createAction(
        '[Auth] Login Success',
        props<{ authResponse: AuthResponse }>()
    );

    export const loginFailure = createAction(
        '[Auth] Login Failure',
        props<{ error: HttpErrorResponse }>()
    );

    export const register = createAction(
        '[Auth] Register',
        props<{ authRequest: AuthRequest }>()
    );

    export const registerSuccess = createAction(
        '[Auth] Register Success',
        props<{ message: string }>()
    );

    export const registerFailure = createAction(
        '[Auth] Register Failure',
        props<{ error: HttpErrorResponse }>()
    );

    export const logout = createAction(
        '[Auth] Logout'
    );