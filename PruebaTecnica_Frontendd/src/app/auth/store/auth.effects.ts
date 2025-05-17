import { Injectable } from '@angular/core';
    import { Actions, createEffect, ofType } from '@ngrx/effects';
    import { of } from 'rxjs';
    import { catchError, map, switchMap, tap } from 'rxjs/operators';
    import { AuthService } from '../services/auth.service';
    import * as AuthActions from './auth.actions';
    import { Router } from '@angular/router';

    @Injectable()
    export class AuthEffects {
        login$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.login),
                switchMap(({ authRequest }) =>
                    this.authService.login(authRequest).pipe(
                        map(authResponse => AuthActions.loginSuccess({ authResponse })),
                        catchError(error => of(AuthActions.loginFailure({ error })))
                    )
                )
            )
        );

        loginSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ authResponse }) => {
                    localStorage.setItem('token', authResponse.token); // Almacenar token
                    this.router.navigate(['/products']);  // Navegar a productos
                })
            ),
            { dispatch: false }
        );

        register$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.register),
                switchMap(({ authRequest }) =>
                    this.authService.register(authRequest).pipe(
                        map(message => AuthActions.registerSuccess({ message })),
                        catchError(error => of(AuthActions.registerFailure({ error })))
                    )
                )
            )
        );

        registerSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.registerSuccess),
                tap(() => {
                    this.router.navigate(['/login']); // Navegar a login
                })
            ),
            { dispatch: false }
        );

        constructor(
            private actions$: Actions,
            private authService: AuthService,
            private router: Router
        ) {}
    }