import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { selectIsLoggedIn } from './store/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private store: Store, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.store.pipe(
            select(selectIsLoggedIn),
            take(1),
            map(isLoggedIn => {
                if (isLoggedIn) {
                    return true;
                } else {
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                    return false;
                }
            })
        );
    }
}